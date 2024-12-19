import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image, ScrollView } from 'react-native';

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const opacityValue = useState(new Animated.Value(1))[0];
  let flipValue = 0;

  animatedValue.addListener(({ value }) => {
    flipValue = value;
  });

  const formatCardNumber = (number: string) => number.padEnd(16, '#').match(/.{1,4}/g)?.join(' ') || '';

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (flipValue >= 90) {
      Animated.parallel([
        Animated.spring(animatedValue, { toValue: 0, friction: 8, tension: 10, useNativeDriver: true }),
        Animated.timing(opacityValue, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(animatedValue, { toValue: 180, friction: 8, tension: 10, useNativeDriver: true }),
        Animated.timing(opacityValue, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
    setFlipped(!flipped);
  };

  const CreditCardPreviewFront = () => (
    <View style={styles.cardPreview}>
      <View style={styles.cardHeader}>
        <Image source={require('../assets/images/hologramme-cb.png')} style={styles.hologram}/>
        <Image source={require('../assets/images/unionpay.png')} style={styles.bankLogo}/>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
        <Text style={styles.cardHolder}>{cardName || 'HOLDER NAME'}</Text>
        <Text style={styles.cardExpiry}>{expiryMonth || 'MM'}/{expiryYear || 'YY'}</Text>
      </View>
    </View>
  );

  const CreditCardPreviewBack = () => (
    <View style={styles.cardPreview}>
      <View style={styles.cardDetails}><Text style={styles.cvv}>{cvv}</Text></View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }], opacity: opacityValue }]}> 
            <CreditCardPreviewFront />
          </Animated.View>
          <Animated.View style={[styles.card, { transform: [{ rotateY: backInterpolate }], opacity: Animated.subtract(1, opacityValue) }]}> 
            <CreditCardPreviewBack />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Card Number" maxLength={16} keyboardType="numeric" value={cardNumber} onChangeText={setCardNumber} />
        <TextInput style={styles.input} placeholder="Card Holder" value={cardName} onChangeText={setCardName} />
        <View style={styles.rowContainer}>
          <TextInput style={[styles.input, styles.smallInput]} placeholder="MM" maxLength={2} keyboardType="numeric" value={expiryMonth} onChangeText={setExpiryMonth} />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="YY" maxLength={2} keyboardType="numeric" value={expiryYear} onChangeText={setExpiryYear} />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="CVV" maxLength={4} keyboardType="numeric" value={cvv} onChangeText={setCvv} />
        </View>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50, backgroundColor: '#f4f4f4' },
  cardContainer: { width: 300, height: 200 },
  card: { width: 300, height: 200, position: 'absolute', backfaceVisibility: 'hidden' },
  cardPreview: { flex: 1, borderRadius: 16, backgroundColor: '#2b2d42', padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hologram: { width: 40, height: 40 },
  bankLogo: { width: 80, height: 40 },
  cardDetails: { flex: 1, justifyContent: 'space-between', marginTop: 16 },
  cardNumber: { color: '#fff', fontSize: 18, letterSpacing: 2 },
  cardHolder: { color: '#fff', fontSize: 14 },
  cardExpiry: { color: '#fff', fontSize: 14 },
  cvv: { textAlign: 'right', color: '#fff', fontSize: 14 },
  formContainer: { padding: 20, alignItems: 'center' },
  input: { width: '90%', height: 50, backgroundColor: '#fff', borderRadius: 8, marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd' },
  smallInput: { width: '25%' },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '90%' },
  button: { marginTop: 20, width: '90%', height: 50, backgroundColor: '#0056d6', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CreditCard;
