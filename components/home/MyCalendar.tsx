import { useTheme } from "@/context/ThemeContext";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["en"] = {
  monthNames: [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

interface MyCalendarProps {
  markedDates: { [key: string]: any };
  onDateSelected: (date: string) => void;
}

export default function MyCalendar({
  markedDates,
  onDateSelected,
}: MyCalendarProps) {
  const { activeColors } = useTheme();

  return (
    <View style={styles.container}>
      <Calendar
        key={activeColors.primary}
        // init calendar with current month
        current={dayjs().toISOString()}
        onDayPress={day => {
          if (onDateSelected) {
            onDateSelected(day.dateString);
          }
        }}
        markedDates={markedDates}
        // markedDates={{
        //   "2026-03-03": { marked: true, dotColor: THEME_ORANGE },
        //   "2026-03-10": { marked: true, dotColor: THEME_ORANGE },
        //   "2026-03-15": { marked: true, dotColor: THEME_ORANGE },

        //   [selected]: {
        //     selected: true,
        //     disableTouchEvent: true,
        //     selectedColor: THEME_GREEN,
        //   },
        // }}
        theme={{
          calendarBackground: "#fff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: activeColors.primary,
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#ff0e0e",
          dayTextColor: "#000000",
          textDisabledColor: "#d9e1e8",
          arrowColor: "#23915c",
          monthTextColor: "#999999",
          textMonthFontWeight: "bold",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
