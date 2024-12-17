import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const SimpleFlip = () => {
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
        <View style={styles.container}>
            <TouchableOpacity onPress={flipCard}>
                <View style={styles.cardContainer}>
                    <Animated.View style={[styles.card, frontAnimatedStyle, styles.front, { opacity: opacityValue }]}>
                        <Text style={styles.text}>Front</Text>
                    </Animated.View>
                    <Animated.View style={[styles.card, backAnimatedStyle, styles.back, { opacity: Animated.subtract(1, opacityValue) }]}>
                        <Text style={styles.text}>Back</Text>
                    </Animated.View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        width: 200,
        height: 300,
    },
    card: {
        width: 200,
        height: 300,
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

export default SimpleFlip;