import React, { useState } from "react";
import {
  Text,
  Layout,
  Card,
  Button,
  useTheme,
  Icon,
} from "@ui-kitten/components";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";

export default function Item() {
  const theme = useTheme();

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
      id: "12asbhejpk",
      name: "Nandini Milk",
      price: "22",
      weight: "500ml",
      quantity: 0,
      image:
        "https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Pasteurised-Toned-Milk-b.png?itok=x64Sfsmk",
    },
  ]);

  function incrementInQuantity(id) {
    const copyOfProducts = [...products];
    const index = copyOfProducts.map((product) => product.id).indexOf(id);
    if (copyOfProducts[index].quantity >= 0)
      copyOfProducts[index].quantity = copyOfProducts[index].quantity + 1;
    setProducts(copyOfProducts);
  }
  function decrementInQuantity(id) {
    const copyOfProducts = [...products];
    const index = copyOfProducts.map((product) => product.id).indexOf(id);
    if (copyOfProducts[index].quantity != 0)
      copyOfProducts[index].quantity = copyOfProducts[index].quantity - 1;
    setProducts(copyOfProducts);
  }
  const QuantityManipulationView = (props) => {
    console.log(props.quantity);
    return (
      <Layout
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          width: Dimensions.get("window").width * 0.22,
          height: 30,
          borderColor: theme["outline-color"],
          borderWidth: 1,
          borderRadius: 4,
        }}
      >
        <Pressable onPress={() => incrementInQuantity(props.id)}>
          <Icon
            style={styles.icon}
            fill={theme["color-primary-600"]}
            name="plus-outline"
          />
        </Pressable>
        <Text>{props.quantity}</Text>
        <Pressable onPress={() => decrementInQuantity(props.id)}>
          <Icon style={styles.icon} fill="#8F9BB3" name="minus-outline" />
        </Pressable>
      </Layout>
    );
  };
  return (
    <Layout style={{ flexWrap: "wrap", flexDirection: "row", flex: 2 }}>
      {products.map((item, index) => {
        return (
          <Layout
            style={{
              padding: 16,
              borderWidth: 1,
              borderColor: theme["outline-color"],
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
            <Text category="p1" style={{ paddingVertical: 6 }}>
              {item.name}
            </Text>
            <Text category="p1">₹{item.price}</Text>
            <Text
              category="c1"
              style={{ color: theme["text-hint-color"], marginVertical: 6 }}
            >
              {item.weight}
            </Text>
            {item.quantity > 0 ? (
              <QuantityManipulationView id={item.id} quantity={item.quantity} />
            ) : (
              <Button
                appearance={"outline"}
                size={"small"}
                onPress={() => incrementInQuantity(item.id)}
                style={{
                  width: Dimensions.get("window").width * 0.22,
                  height: 30,
                }}
              >
                ADD
              </Button>
            )}
          </Layout>
        );
      })}
    </Layout>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
