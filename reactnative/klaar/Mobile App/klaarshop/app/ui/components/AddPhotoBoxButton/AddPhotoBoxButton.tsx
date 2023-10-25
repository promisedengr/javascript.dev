import i18next from "i18next";
import * as React from "react";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Theme, useThemeContext } from "~/ui/theme";
import { fonts } from "~/ui/theme/default/fonts";
import PhotoIcon from "./assets/photoIcon";

export type AddPhotoBoxButtonType = {
  onPress(): void;
};

const AddPhotoBoxButton: React.FC<AddPhotoBoxButtonType> = (props) => {
  const { onPress } = props;

  const { s } = useThemeContext(createStyle);

  return (
    <TouchableOpacity style={s?.buttonStyle} onPress={onPress}>
      <PhotoIcon />
      <Text style={[s?.photoIconText, fonts.h4.secondary]}>
        {i18next.t("addProduct.addPhoto")}
      </Text>
    </TouchableOpacity>
  );
};

const MAddPhotoBoxButton = memo(AddPhotoBoxButton);
export { MAddPhotoBoxButton as AddPhotoBoxButton };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 79,
      height: 79,
      marginBottom: 9,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonStyle: {
      alignItems: "center",
      borderRadius: 30,
    },
    photoIconText: {
      color: theme.colors.white,
    },
  });
