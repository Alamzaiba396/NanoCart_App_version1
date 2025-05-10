import React, { useState } from "react";
import {
  View,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";

  const PartnerPaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  

//   navigate to partnerorderconfirmation

  const handlePayment = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", //  Razorpay test key
      amount: 100 * 100, // ₹100 converted to paise
      currency: "INR",
      name: "Demo App",
      description: "Test Razorpay Interface",
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9876543210",
      },
      theme: { color: "#F37254" },
    };

    setLoading(true);

    RazorpayCheckout.open(options)
      .then((data) => {
        Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Failed", `Error: ${error.description}`);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Button
        title={loading ? "Processing..." : "Pay ₹100"}
        onPress={handlePayment}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" color="#F37254" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default PartnerPaymentScreen;
