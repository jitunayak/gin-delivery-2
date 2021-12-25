import { Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS } from "../utilities/Constants";
import moment from "moment";

export default function TimSchedule() {
  const [scheduledDeliveryTime, setScheduledDeliveryTime] = useState(null);

  const currenttime = new Date();

  const times = [
    { time: "08:00 AM (Morning)", hour: 8 },
    { time: "10:00 AM (Morning)", hour: 10 },
    { time: "04:00 PM (Afternoon)", hour: 16 },
    { time: "05:00 PM (Afternoon)", hour: 17 },
    { time: "06:00 PM (Afternoon)", hour: 18 },
  ];

  const checkAvailability = (time) => {
    return currenttime.getHours() + 2 < time ? true : false;
  };
  return (
    <Layout style={{ marginVertical: 10, padding: 10 }}>
      <Text category={"h6"} style={{ marginVertical: 6 }}>
        Choose your Schedule
      </Text>
      {times.map((time, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              margin: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor:
                scheduledDeliveryTime === time.time
                  ? COLORS.ACCENT
                  : checkAvailability(time.hour)
                  ? COLORS.ACCENT_LIGHT
                  : COLORS.LIGHT_GREY,
              padding: 16,
              borderRadius: 4,
            }}
            disabled={!checkAvailability(time.hour)}
            onPress={() => {
              setScheduledDeliveryTime(time.time);
            }}
          >
            <Text
              category={"c2"}
              style={{
                color:
                  scheduledDeliveryTime === time.time
                    ? COLORS.WHITE
                    : checkAvailability(time.hour)
                    ? COLORS.ACCENT
                    : COLORS.GREY,
              }}
            >
              {time.time}
            </Text>
            <Text
              category={"c2"}
              style={{
                textAlign: "right",
                color:
                  scheduledDeliveryTime === time.time
                    ? COLORS.WHITE
                    : checkAvailability(time.hour)
                    ? COLORS.ACCENT
                    : COLORS.GREY,
              }}
            >
              {checkAvailability(time.hour) ? "Available" : "Unavailable"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Layout>
  );
}
