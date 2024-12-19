import React, { useState } from 'react';
import { View, Text,TextInput , TouchableOpacity, StyleSheet, Animated, ScrollView, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';


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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={-40} style={stylesInput.container1}>
      <TouchableOpacity onPress={flipCard}>
        <View style={stylesInput.cardContainer}>
          <Animated.View style={[stylesInput.card, frontAnimatedStyle, stylesInput.front, { opacity: opacityValue }]}>
          <ImageBackground
          source={require("../../assets/images/10.jpeg")}
          style={stylesInput.cardBackground}
          >
            <Text style={stylesInput.text}>Front</Text>
          </ImageBackground>
          </Animated.View>
          <Animated.View style={[stylesInput.card, backAnimatedStyle, stylesInput.back, { opacity: Animated.subtract(1, opacityValue) }]}>
          <ImageBackground
          source={require("../../assets/images/10.jpeg")}
          style={stylesInput.cardBackground}
          >
            <Text style={stylesInput.text}>Back</Text>
          </ImageBackground>
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
          placeholder='**** **** **** ****'
          placeholderTextColor={'#c5c3c2'}
        />

        <Text style={stylesInput.title}>Card Holder</Text>
        <TextInput
          style={stylesInput.input}
          value={cardName}
          onChangeText={setCardName}
          placeholder='Name Surname'
          placeholderTextColor={'#c5c3c2'}
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
                placeholderTextColor={'#c5c3c2'}
                keyboardType="numeric"
              />
              <TextInput
                style={[stylesInput.input, stylesInput.inputSmall]}
                value={expiryYear}
                onChangeText={setExpiryYear}
                maxLength={2}
                placeholder="YY"
                placeholderTextColor={'#c5c3c2'}
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
              placeholderTextColor={'#c5c3c2'}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* Submit Button */}
        <TouchableOpacity style={stylesInput.button}>
          <Text style={stylesInput.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

    </KeyboardAvoidingView>


  );
};


const stylesInput = StyleSheet.create({
  // container: {
  //   backgroundColor: '#DAEEFE',
  //   alignItems: 'center',
  //   padding: '5%',
  // },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    padding: '5%',
    backgroundColor: '#DAEEFE',
  },

/*------------------------------------------------------------------------------------------------------------------*/
// CARD PREVIEW STYLE

  cardPreview: {
    display: 'flex',
    width: '75%',
    aspectRatio: 1.586,
    backgroundColor: '#2b2d42',
    borderRadius: 16,
    padding: '4%',
    zIndex: 1,
    elevation: 20,
    shadowColor: '#52006A',
  },
  cardContainer: {
    display: 'flex',
    width: '75%',
    aspectRatio: 1.586,
    overflow: 'hidden',
    padding: '4%',
    // height: 200,
    zIndex: 2,
  },
  card: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 16,
    zIndex: 3,
  },
  front: {
    position: 'absolute',
    zIndex: 3,
  },
  back: {
    position: 'absolute',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  cardBackground: {
    position: 'absolute',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    zIndex: 3,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

/*---------------------------------------------------------------------------------------------------------------------*/
// CARD INPUT STYLE

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

