import React, { useState } from 'react';
import { View, Text,TextInput , TouchableOpacity, StyleSheet, Animated, Image, ImageBackground, ScrollView } from 'react-native';




const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const formatCardNumber = (number: string) => {
    const formattedNumber = number.padEnd(16, '#');
    return formattedNumber.match(/.{1,4}/g)?.join(' ') || '';
  };

  const [flipped, setFlipped] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const opacityValue = useState(new Animated.Value(1))[0];
  let value = 0;

  animatedValue.addListener(({ value: val }) => {
    value = val;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (value >= 90) {
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const CreditCardPreviewFront = () => {
    return(
      <View style={stylesInput.cardPreview}>
        <ImageBackground source={require('../assets/images/10.jpeg')} style={stylesInput.cardBackground}>
        <View style={stylesInput.cardInfosContainer}>
          <View style={stylesInput.logo}>
            <Image source={require('../assets/images/hologramme-cb.png')} style={stylesInput.hologram}/>
            <Image source={require('../assets/images/unionpay.png')} style={stylesInput.logoBank}/>
          </View>
          <View style={stylesInput.cardInfos}>
            <Text style={stylesInput.cardNumber}>{formatCardNumber(cardNumber)}</Text>
            <Text style={stylesInput.cardHolder}>{cardName || 'HOLDER NAME'}</Text>
            <Text style={stylesInput.cardExpiry}>
              {expiryMonth || 'MM'}/{expiryYear || 'YY'}
            </Text>
          </View>
        </View>
        </ImageBackground>
      </View>
  )}

  const CreditCardPreviewBack = () => {
    return(
    <View style={stylesInput.cardPreview}>
      <ImageBackground source={require('../assets/images/10.jpeg')} style={stylesInput.cardBackground}>
        <View style={stylesInput.cardInfos}>
          <Text style={stylesInput.cvv}>{cvv}</Text>
        </View>
      </ImageBackground>
    </View>
  )}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.card, frontAnimatedStyle, styles.front, { opacity: opacityValue }]}>
            <CreditCardPreviewFront/>
          </Animated.View>
          <Animated.View style={[styles.card, backAnimatedStyle, styles.back, { opacity: Animated.subtract(1, opacityValue) }]}>
            <CreditCardPreviewBack/>
          </Animated.View>
        </View>
      </TouchableOpacity>

      <ScrollView style={stylesInput.inputCard} contentContainerStyle={stylesInput.scrollViewContent}>
        <Text style={stylesInput.title}>Card Number</Text>
        <TextInput
          style={stylesInput.input}
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <Text style={stylesInput.title}>Card Holder</Text>
        <TextInput
          style={stylesInput.input}
          value={cardName}
          onChangeText={setCardName}
        />

        {/* Expiry Date and CVV */}
        <View style={stylesInput.row}>
          <View style={stylesInput.col}>
            <Text style={stylesInput.title}>Expiration Date</Text>
            <View style={stylesInput.row}>
              <TextInput
                style={[stylesInput.input, stylesInput.inputSmall]}
                value={expiryMonth}
                onChangeText={setExpiryMonth}
                maxLength={2}
                placeholder="MM"
                keyboardType="numeric"
              />
              <TextInput
                style={[stylesInput.input, stylesInput.inputSmall]}
                value={expiryYear}
                onChangeText={setExpiryYear}
                maxLength={2}
                placeholder="YY"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={stylesInput.spacer}></View>
          <View style={stylesInput.col}>
            <Text style={stylesInput.title}>CVV</Text>
            <TextInput
              style={stylesInput.input}
              value={cvv}
              onChangeText={setCvv}
              maxLength={4}
              placeholder='***'
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* Submit Button */}
        <TouchableOpacity style={stylesInput.button}>
          <Text style={stylesInput.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  cardContainer: {
    width: 300,
    height: 200,
    zIndex: 3,
  },
  card: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  front: {
    backgroundColor: 'skyblue',
    position: 'absolute',
  },
  back: {
    backgroundColor: 'tomato',
    position: 'absolute',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

const stylesInput = StyleSheet.create({
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
    // justifyContent: 'space-between',
    zIndex: 1,
    elevation: 20,
    shadowColor: '#52006A',
  },
  cardBackground: {
    position: 'absolute',
    width: 253,
    height: 160,
    borderRadius: 16,
    zIndex: 2,
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hologram: {
    width: 40,
    height: 50,
    zIndex: 3,
  },
  logoBank: {
    width: 80,
    height: 40,
    zIndex: 3,
  },
  cardInfosContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 3,
  },
  cardInfos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '70%',
    zIndex: 3,
  },
  inputCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 'auto',
    paddingTop: '20%',
    paddingBottom: '10%',
    position: 'relative',
    top: '-12%',
    zIndex: 0,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  cardNumber: {
    width: '100%',
    color: 'white',
    letterSpacing: 2,
    marginTop: 15,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '3%',
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
    width: 80,
    borderRadius: 8,
    borderColor: '#ddd',
    height: 50,
    marginLeft: "7%",
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
    paddingRight: 40,
  },
});


export default CreditCard;