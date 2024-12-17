import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';


interface FlipCardProps {
  isFlipped: Animated.SharedValue<boolean>;
  cardStyle?: object;
  direction?: 'x' | 'y';
  duration?: number;
  FirstSide: React.ReactNode;
  SecondSide: React.ReactNode;
}

const FlipCard: React.FC<FlipCardProps> = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  FirstSide,
  SecondSide,
}) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}>
        {FirstSide}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}>
        {SecondSide}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: 'hidden',
    zIndex: 2,
  },
});

const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

const CreditCardInput = () => {

  // Variables
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  // Function to format the card number
  const formatCardNumber = (number: string) => {
    const formattedNumber = number.padEnd(16, '#');
    return formattedNumber.match(/.{1,4}/g)?.join(' ') || '';
  };

  const FirstSide = () => {
    return (
      <View style={styles.cardPreview}>
        <Text>Card</Text>
      </View>
      // <View style={styles.cardPreview}>
      //     <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
      //     <Text style={styles.cardHolder}>{cardName || 'HOLDER NAME'}</Text>
      //     <View style={styles.rowPreview}>
      //       <Text style={styles.cardExpiry}>{expiryMonth || 'MM'}/{expiryYear || 'YY'}</Text>
      //       <Text style={styles.cvv}>{cvv || 'CVV'}</Text>
      //     </View>
      //   </View>
    );
  };

  const SecondSide = () => {
    return (
      <View style={styles.cardPreview}>
        <Text>Flipped content 🚀</Text>
      </View>
    );
  };

  return (

    <View style={styles.container}>
      
      {/* Card Preview */}
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.cardPreview}
        SecondSide={<SecondSide />}
        FirstSide={<FirstSide />}
      />

      {/* Input Fields */}
      <View style={styles.inputCard}>

        {/* Card Number */}
        <Text style={styles.title}>Card Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        
          {/* Card Holder */}
        <Text style={styles.title}>Card Holder</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
        />

        {/* Expiry Date and CVV */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={[styles.title, {paddingLeft:10}]}>Expiration Date</Text>
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
          <View style={styles.col}>
            <Text style={styles.title}>CVV</Text>
            <TextInput
              style={[styles.input, styles.inputSmall]}
              value={cvv}
              onChangeText={setCvv}
              maxLength={4}
              keyboardType="numeric"
              onFocus={handlePress}
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
    backgroundColor: '#2b2d42',
    borderRadius: 16,
    padding: '4%',
    justifyContent: 'space-evenly', // Possibilité de changer pour space-between si pas de logo de carte
    zIndex: 10,
  },
  inputCard: {
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
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    marginLeft: '3%',
  },
  col: {
    flex: 1,
  },
  rowPreview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  inputSmall: {
    marginRight: 10,
  },
});

export default CreditCardInput;