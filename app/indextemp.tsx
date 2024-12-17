import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,withTiming,} from 'react-native-reanimated';

const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (number: string) => {
    const formattedNumber = number.padEnd(16, '#');
    return formattedNumber.match(/.{1,4}/g)?.join(' ') || '';
  };


  return (

    <View style={styles.container}>
      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
        <Text style={styles.cardHolder}>{cardName || 'HOLDER NAME'}</Text>
        <View style={styles.rowPreview}>
          <Text style={styles.cardExpiry}>
            {expiryMonth || 'MM'}/{expiryYear || 'YY'}
          </Text>
          <Text style={styles.cvv}>{cvv || 'CVV'}</Text>
        </View>
      </View>

      {/* Input Fields */}
      <View style={styles.inputCard}>
        <Text style={styles.title}>Card Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <Text style={styles.title}>Card Holder</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
        />

        {/* Expiry Date and CVV */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.title}>Expiration Date</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.inputSmall]}
                value={expiryMonth}
                onChangeText={setExpiryMonth}
                maxLength={2}
                placeholder="MM"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.inputSmall]}
                value={expiryYear}
                onChangeText={setExpiryYear}
                maxLength={2}
                placeholder="YY"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.spacer}>
          </View>
          <View style={styles.col}>
            <Text style={styles.title}>CVV</Text>
            <TextInput
              style={[styles.input, styles.inputSmall]}
              value={cvv}
              onChangeText={setCvv}
              maxLength={4}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DAEEFE',
    alignItems: 'center',
    padding: '5%',
  },
  cardPreview: {
    display: 'flex',
    width: '75%',
    aspectRatio: 1.586,
    backgroundColor: '#2b2d42',
    borderRadius: 16,
    padding: '4%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  inputCard: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 'auto',
    paddingTop: '20%',
    paddingBottom: '10%',
    position: 'relative',
    top: '-12%',
    zIndex: 0,
  },
  cardNumber: {
    width: '100%',
    color: 'white',
    letterSpacing: 2,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  cardExpiry: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    marginLeft: '3%',
  },
  rowPreview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderColor: '#ddd',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#0056d6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputPicker: {
    width: '30%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
  },
  cvv: {
    color: 'white',
    letterSpacing: 2,
  },
  title: {
    width: '90%',
    textAlign: 'left',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 5,
    color: 'black',
  },
  col: {
    flex: 1,
  },
  inputSmall: {
    width: 80,
    marginRight: 10,
  },
  spacer: {
    width: 70,
  }
});

export default CreditCardInput;