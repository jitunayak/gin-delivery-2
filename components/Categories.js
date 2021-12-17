import { Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";

const Categories = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState([
    {
      id: "189sdjnsd",
      name: "Dairy & Eggs",
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
        "https://cdn-icons.flaticon.com/png/512/859/premium/859354.png?token=exp=1639763241~hmac=1227a6da836f76a905a8c5fdeaee9596",
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
          currentCategory === category.id ? theme["color-primary-hover"] : "",
        height: Dimensions.get("window").width / 4,
        width: Dimensions.get("window").width / 4,
        margin: 1,
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: category.image }}
        style={{ width: 50, height: 50 }}
      />
      <Text category="c2" style={{ fontSize: 14 }}>
        {" "}
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item category={item} />;

  return (
    <Layout
      style={{
        flexDirection: "column",
        backgroundColor: theme["color-primary-50"],
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
