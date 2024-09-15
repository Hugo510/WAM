import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const IDScanScreen = () => {
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [extractedData, setExtractedData] = useState(null);
    const [error, setError] = useState(null);

    // Solicitar permisos al cargar el componente
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la galería de imágenes.');
            }
        })();
    }, []);

    const pickImage = async (setImage) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (err) {
            console.error('Error al seleccionar la imagen:', err);
            Alert.alert('Error', 'Hubo un problema al acceder a la galería de imágenes.');
        }
    };

    const parseDetectedText = (detectedTexts) => {
        // Combinar el texto de ambas imágenes
        const combinedText = detectedTexts.map(item => item.detectedText).join('\n');

        // Convertimos el texto en un array de líneas
        const lines = combinedText.split('\n').map(line => line.trim()).filter(line => line !== '');

        let data = {
            name: null,
            address: null,
            curp: null,
            birthDate: null,
            validity: null,
        };

        // Buscamos los índices de los campos conocidos
        const nameIndex = lines.findIndex(line => line.toLowerCase() === 'nombre');
        const addressIndex = lines.findIndex(line => line.toLowerCase() === 'domicilio');
        const curpIndex = lines.findIndex(line => line.toLowerCase() === 'curp');
        const birthDateIndex = lines.findIndex(line => line.toLowerCase() === 'fecha de nacimiento');
        const validityIndex = lines.findIndex(line => line.toLowerCase() === 'vigencia');

        // Extraemos el nombre
        if (nameIndex !== -1) {
            let nameParts = [];
            for (let i = nameIndex + 1; i < lines.length; i++) {
                if (lines[i].toLowerCase() === 'domicilio' || lines[i].toLowerCase() === 'domicilio:') {
                    break;
                }
                nameParts.push(lines[i]);
            }
            data.name = nameParts.join(' ');
        }

        // Extraemos el domicilio
        if (addressIndex !== -1) {
            let address = [];
            for (let i = addressIndex + 1; i < lines.length; i++) {
                if (['clave de elector', 'curp', 'fecha de nacimiento'].includes(lines[i].toLowerCase())) {
                    break;
                }
                address.push(lines[i]);
            }
            data.address = address.join(', ');
        }

        // Extraemos el CURP
        if (curpIndex !== -1 && curpIndex + 1 < lines.length) {
            data.curp = lines[curpIndex + 1];
        }

        // Extraemos la fecha de nacimiento
        if (birthDateIndex !== -1 && birthDateIndex + 1 < lines.length) {
            data.birthDate = lines[birthDateIndex + 1];
        }

        // Extraemos la vigencia
        if (validityIndex !== -1 && validityIndex + 1 < lines.length) {
            data.validity = lines[validityIndex + 1];
        }

        return data;
    };

    const handleSendImages = () => {
        if (!frontImage || !backImage) return;
        setIsLoading(true);
        setError(null);

        // Simulación de la respuesta del backend con retraso
        setTimeout(() => {
            try {
                // Crear un FormData para enviar las imágenes
            const formData = new FormData();

            // Ajustar la URI para Android (necesario en algunos casos)
            const adjustedFrontImageUri = frontImage.startsWith('file://') ? frontImage : `file://${frontImage}`;
            const adjustedBackImageUri = backImage.startsWith('file://') ? backImage : `file://${backImage}`;

            formData.append('file1', {
                uri: adjustedFrontImageUri,
                name: 'front_image.jpg',
                type: 'image/jpeg',
            });
            formData.append('file2', {
                uri: adjustedBackImageUri,
                name: 'back_image.jpg',
                type: 'image/jpeg',
            });

            // URL del backend (actualiza esto con tu endpoint real)
            const backendUrl = 'http://192.168.237.150:3000/api/vision/upload';

            // Realizar la solicitud POST al backend
            const response = await fetch(backendUrl, {
                method: 'POST',
                body: formData,
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
            }

            // Intentar parsear la respuesta JSON
            let data;
            try {
                data = await response.json();
                console.log(data);
            } catch (parseError) {
                throw new Error('Error al parsear la respuesta del servidor.');
            }// Procesar el arreglo de 'detectedText' para extraer los campos
            const extractedData = parseDetectedText(data);

            // Verificar si al menos un campo tiene datos
            const hasData = Object.values(extractedData).some(value => value !== null && value !== '');

            if (!hasData) {
                throw new Error('No se pudo extraer información válida de las imágenes proporcionadas.');
            }
            // Actualizar el estado con los datos extraídos
            setExtractedData(extractedData);
            } catch (error) {
                console.error('Error al procesar las imágenes:', error);
                setError(error.message);
                Alert.alert('Error', error.message);
            } finally {
                setIsLoading(false);
            }
        }, 2000); // Simula un retraso de 2 segundos
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Carga tu credencial</Text>
            <Text style={styles.subtitle}>Sube ambas caras de tu INE para extraer la información</Text>

            {/* Componente de carga de la imagen frontal */}
            <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setFrontImage)}>
                {frontImage ? (
                    <Image source={{ uri: frontImage }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Icon name="photo-camera" size={40} color="#999" />
                        <Text style={styles.placeholderText}>Subir parte frontal</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Componente de carga de la imagen trasera */}
            <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setBackImage)}>
                {backImage ? (
                    <Image source={{ uri: backImage }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Icon name="photo-camera" size={40} color="#999" />
                        <Text style={styles.placeholderText}>Subir parte trasera</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Botón de envío */}
            <TouchableOpacity
                style={[styles.button, (!frontImage || !backImage || isLoading) && styles.buttonDisabled]}
                onPress={handleSendImages}
                disabled={!frontImage || !backImage || isLoading}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar imágenes</Text>}
            </TouchableOpacity>

            {/* Mostrar mensaje de error si existe */}
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Indicador de carga simple */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#B71C1C" />
                    <Text style={styles.loadingText}>Procesando imágenes...</Text>
                </View>
            )}

            {/* Visualización de los datos extraídos */}
            {extractedData && !isLoading && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataTitle}>Información extraída</Text>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Nombre:</Text>
                        <Text style={styles.dataValue}>{extractedData.name || 'Dato no disponible'}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Domicilio:</Text>
                        <Text style={styles.dataValue}>{extractedData.address || 'Dato no disponible'}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>CURP:</Text>
                        <Text style={styles.dataValue}>{extractedData.curp || 'Dato no disponible'}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Fecha de Nacimiento:</Text>
                        <Text style={styles.dataValue}>{extractedData.birthDate || 'Dato no disponible'}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>Vigencia:</Text>
                        <Text style={styles.dataValue}>{extractedData.validity || 'Dato no disponible'}</Text>
                    </View>
                </View>
            )}

            {/* Mostrar mensaje cuando no hay datos y no hay error */}
            {!extractedData && !isLoading && !error && (
                <Text style={styles.noDataText}>Aún no hay datos extraídos</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // (Los estilos permanecen igual que en tu código original)
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B71C1C',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    placeholder: {
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#B71C1C',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    buttonDisabled: {
        backgroundColor: '#e0e0e0',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    dataContainer: {
        marginTop: 30,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B71C1C',
        marginBottom: 15,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dataLabel: {
        fontWeight: 'bold',
        color: '#666',
    },
    dataValue: {
        color: '#333',
        flex: 1,
        textAlign: 'right',
        marginLeft: 10,
    },
    noDataText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 30,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default IDScanScreen;
