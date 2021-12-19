import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { COLORS, FONTS } from "../utilities/Constants";
import { Layout, Text } from "@ui-kitten/components";
export default function Item({ navigation }) {
  const dispatch = useDispatch();
  // const { items } = useSelector((state) => state.cartReducer.selectedItems);

  //console.log(items);
  const [products, setProducts] = useState([
    {
      id: "12asbhej",
      name: "Nandini Milk",
      price: "22",
      weight: "500ml",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Pasteurised-Toned-Milk-b.png?itok=x64Sfsmk",
    },
    {
      id: "1we23kl",
      name: "Toned milk",
      price: "30",
      weight: "500ml",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Nandini-Double-Toned-Milk-b.png?itok=vdjKgE_l",
    },
    {
      id: "12asbhejp",
      name: "Nandini Milk",
      price: "22",
      weight: "500ml",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Pasteurised-Toned-Milk-b.png?itok=x64Sfsmk",
    },
    {
      id: "1we23klp",
      name: "Toned milk",
      price: "30",
      weight: "500ml",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Nandini-Double-Toned-Milk-b.png?itok=vdjKgE_l",
    },
    {
      id: "1we23klpd",
      name: "Panner",
      price: "30",
      weight: "1ltr",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Nandini-Double-Toned-Milk-b.png?itok=vdjKgE_l",
    },
    {
      id: "12asbhevjpk",
      name: "Nandini Milk",
      price: "22",
      weight: "500ml",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Pasteurised-Toned-Milk-b.png?itok=x64Sfsmk",
    },
  ]);

  function incrementInQuantity(props) {
    //console.log({ increment: props.item });
    const copyOfProducts = [...products];
    copyOfProducts.map((product) => {
      product.id === props.item.id && (product.quantity = product.quantity + 1);
    });
    const data = copyOfProducts.filter(
      (product) => product.id === props.item.id
    );
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: data,
    });

    setProducts(copyOfProducts);
    navigation.navigate("Order");
  }
  function decrementInQuantity(props) {
    const copyOfProducts = [...products];
    copyOfProducts.map((product) => {
      product.id === props.item.id && (product.quantity = product.quantity - 1);
    });

    const data = copyOfProducts.filter(
      (product) => product.id === props.item.id
    );
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: data,
    });

    setProducts(copyOfProducts);
  }
  function AddButton(props) {
    // console.log({ "add button pressed": props });

    dispatch({ type: "REMOVE_FROM_CART", payload: props.item });

    return (
      <TouchableOpacity
        size={"small"}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          dispatch({
            type: "ADD_TO_CART",
            payload: props.item,
          });
          incrementInQuantity(props);
        }}
        style={{
          width: Dimensions.get("window").width * 0.22,
          height: 40,
          borderColor: COLORS.PRIMARY,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
        }}
      >
        <Text style={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>ADD</Text>
      </TouchableOpacity>
    );
  }
  function QuantityManipulationView(props) {
    // console.log({ "quantity view": props });
    return (
      <Layout
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-around",
          alignItems: "center",
          width: Dimensions.get("window").width * 0.22,
          height: 40,
          borderColor: COLORS.LIGHT_GREY,
          borderWidth: 2,
          borderRadius: 4,
        }}
      >
        <Pressable
          onPress={() => {
            incrementInQuantity(props);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Text
            category={"c1"}
            style={{
              fontSize: FONTS.H1,
              fontWeight: "bold",
              color: COLORS.PRIMARY,
            }}
          >
            +
          </Text>
        </Pressable>
        <Text style={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>
          {props.item.quantity}
        </Text>
        <Pressable
          onPress={() => {
            decrementInQuantity(props);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Text
            style={{
              fontSize: FONTS.H1,
              fontWeight: "500",
              color: COLORS.PRIMARY,
            }}
          >
            -
          </Text>
        </Pressable>
      </Layout>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <Layout
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          backgroundColor: COLORS.WHITE,
        }}
      >
        {products.map((item, index) => {
          return (
            <Layout
              style={{
                padding: 18,
                borderWidth: 1,
                borderColor: COLORS.LIGHT_GREY,
              }}
              key={item.id}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "transparent",
                }}
              />
              <Text
                category={"p1"}
                style={{
                  paddingVertical: 6,
                  fontSize: FONTS.H4,
                }}
              >
                {item.name}
              </Text>
              <Text>₹{item.price}</Text>
              <Text
                category={"p2"}
                style={{ color: COLORS.GREY, marginVertical: 6 }}
              >
                {item.weight}
              </Text>

              {item.quantity > 0 ? (
                <QuantityManipulationView item={item} />
              ) : (
                <>
                  <AddButton item={item} />
                </>
              )}
            </Layout>
          );
        })}
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
