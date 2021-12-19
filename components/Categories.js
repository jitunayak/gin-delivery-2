import { Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";

const Categories = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState([
    {
      id: "189sdjnsd",
      name: "Dairy",
      category: "Dairy & Eggs",
      image: "https://cdn-icons-png.flaticon.com/512/3500/3500270.png",
    },
    {
      id: "189sdjnsdp",
      name: "vegetables",
      category: "vegetables",
      image: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png",
    },
    {
      id: "189sdjnsd1",
      name: "Breakfast",
      category: "Milk",
      image: "https://cdn-icons-png.flaticon.com/512/3480/3480823.png",
    },
    {
      id: "189sdjnsdp1",
      name: "Snacks",
      category: "Milk",
      image:
        "https://cdn-icons.flaticon.com/png/512/2137/premium/2137769.png?token=exp=1639798922~hmac=c9b6f1f8def9a56cb93241f85d06f04e",
    },
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0].id);

  const Item = ({ category }) => (
    <TouchableOpacity
      onPress={() => {
        setCurrentCategory(category.id);
      }}
      style={{
        alignItems: "center",
        backgroundColor:
          currentCategory === category.id ? theme["color-primary-200"] : "",
        height: Dimensions.get("window").width / 5,
        width: Dimensions.get("window").width / 5,
        margin: 2,
        borderRadius: 4,
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: category.image }}
        style={{ width: 50, height: 50 }}
      />
      <Text
        category="c1"
        style={{
          fontSize: 14,
          color: currentCategory === category.id ? "black" : "black",
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item category={item} />;

  return (
    <Layout
      style={{
        flexDirection: "column",
        padding: 10,
        justifyContent: "flex-end",
      }}
    >
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(category) => category.id}
        renderItem={renderItem}
      />
    </Layout>
  );
};

export default Categories;
