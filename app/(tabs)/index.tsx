import React, { useState } from 'react';
import { View, Text,TextInput , TouchableOpacity, StyleSheet, Animated, ScrollView, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

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

  const cardfront = () => {
    if (value >= 90) {
      flipCard();
    }
    setFlipped(false);
  }

  const cardback = () => {
    if (value < 90) {
      flipCard();
    }
    setFlipped(true);
  }

  const getCardType = () => {
    let number = cardNumber;
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";
    
    re = new RegExp('^9792')
    if (number.match(re) != null) return 'troy'

    return "visa"; // default type
  };

  const getBankLogo = () => {
    const type = getCardType();
    switch (type) {
      case "visa":
        return require("../../assets/images/visa.png");
      case "amex":
        return require("../../assets/images/amex.png");
      case "mastercard":
        return require("../../assets/images/mastercard.png");
      case "discover":
        return require("../../assets/images/discover.png");
      case "troy":
        return require("../../assets/images/troy.png");
      default:
        return require("../../assets/images/visa.png");
    }
  }

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={-40} style={stylesInput.container1}> 
      <View style={[stylesInput.cardPreviewWrapper]}>
    <TouchableOpacity onPress={flipCard}>
      <View style={stylesInput.cardContainer}>
        <Animated.View style={[stylesInput.card, frontAnimatedStyle, stylesInput.front, { opacity: opacityValue }]}>
          <ImageBackground
            source={require("../../assets/images/10.jpeg")}
            style={stylesInput.cardBackground}
          >
            <View style={stylesInput.logo}>
              <View style={stylesInput.logoContainer}>
                <ImageBackground source={getBankLogo()} style={stylesInput.logoBank} resizeMode='contain'/>
              </View>
            </View>
            <Text style={stylesInput.cardNumber}>{formatCardNumber(cardNumber)}</Text>
            <Text style={stylesInput.cardHolder}>{cardName || "HOLDER NAME"}</Text>
              <Text style={stylesInput.cardExpiry}>
                {expiryMonth || "MM"}/{expiryYear || "YY"}
              </Text>
          </ImageBackground>
        </Animated.View>
        <Animated.View style={[stylesInput.card, backAnimatedStyle, stylesInput.back, { opacity: Animated.subtract(1, opacityValue) }]}>
          <ImageBackground
            source={require("../../assets/images/10.jpeg")}
            style={stylesInput.cardBackground}
          >
            <Text style={stylesInput.cvvCard}>
              {cvv || "CVV"}
            </Text>
          </ImageBackground>
        </Animated.View>
      </View>
    </TouchableOpacity>
  </View>

      <ScrollView style={stylesInput.inputCard} contentContainerStyle={stylesInput.scrollViewContent}>  
        <Text style={stylesInput.title}>Card Number</Text>
        <TextInput                          // Input of the card numbers
          style={stylesInput.input}
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder='**** **** **** ****'
          placeholderTextColor={'#c5c3c2'}
        />

        <Text style={stylesInput.title}>Card Holder</Text>
        <TextInput                        // Input of the card name
          style={stylesInput.input}
          value={cardName}
          onChangeText={setCardName}
          placeholder='Name Surname'
          placeholderTextColor={'#c5c3c2'}
        />

        
        <View style={stylesInput.row}>            
          <View style={stylesInput.col}>          
            <Text style={stylesInput.title}>Expiration Date</Text>
            <View style={stylesInput.row}>        
              <TextInput                  // Input of the card expiry date 
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
            <TextInput                  // Input of the card cvv
              style={stylesInput.input}
              value={cvv}
              onChangeText={setCvv}
              maxLength={4}
              placeholder='***'
              placeholderTextColor={'#c5c3c2'}
              keyboardType="numeric"
              onFocus={cardback}
              onBlur={cardfront}
            />
          </View>
        </View>
        
        <TouchableOpacity style={stylesInput.button}> 
          <Text style={stylesInput.buttonText}>Submit</Text>  
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const stylesInput = StyleSheet.create({
  container1: {
  flex: 1,
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  padding: '5%',
  backgroundColor: '#DAEEFE',
  bottom: 50,
  },

/*------------------------------------------------------------------------------------------------------------------*/
// CARD PREVIEW STYLE

  cardPreviewWrapper: {
  position: 'relative',
  top: '10%', 
  zIndex: 10,
  width: '100%',
  alignItems: 'center',
  },

  cardPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '75%',
    aspectRatio: 1.586,
    backgroundColor: '#2b2d42',
    padding: 0,
  },
  cardContainer: {
    width: '75%',
    aspectRatio: 1.586,
    overflow: 'hidden',
    padding: '4%',
    borderRadius: 16,
  },
  card: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  front: {
    position: 'absolute',
  },
  back: {
    position: 'absolute',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  cardBackground: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
    position: 'absolute',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 15,
    paddingRight: 35,
    width: '100%',
  },
  logoContainer: {
    width: 80,
    height: 40,
  },
  logoBank: {
    width: '100%',
    height: '100%',
  },


  cardInfosContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cardInfos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '70%',
  },

/*---------------------------------------------------------------------------------------------------------------------*/
// CARD INPUT STYLE

  inputCard: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 5,
    position: 'relative',
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
  cardNumber: {
    width: '100%',
    color: 'white',
    letterSpacing: 2,
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingTop: 10,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  cardExpiry: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cvvCard: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 130,
    paddingLeft: 175,
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

