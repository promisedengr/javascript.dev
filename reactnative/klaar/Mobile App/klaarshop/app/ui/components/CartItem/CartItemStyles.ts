import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');
const HEIGHT = 95;
const picH = 64;

export const createStyle = (theme: Theme) =>
    StyleSheet.create({
        background: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: theme.colors.lightGray,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            overflow: "hidden",
        },
        content: {
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            height: HEIGHT,
            borderTopWidth: 1,
            borderColor: theme.colors.gray
        },
        picContainer: {
            height: picH,
            width: picH,
            backgroundColor: theme.colors.white,
            borderRadius: 5,
            justifyContent: 'flex-end',
            position: 'relative',
            marginRight: theme.metrics.x4
        },
        productImageStyles: {
            width: '100%',
            height: '100%',
            borderRadius: 20
        },
        infoContainer: {
            height: 64,
            width: width - (theme.metrics.x4 * 2 + picH + theme.metrics.x2),
            justifyContent: 'space-around'
        },
        spaceBetweenRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        productNameText: {
            fontSize: theme.fonts.sizes.h2 + 1,
            fontWeight: '500'
        },
        colorPreviewContainer: {
            height: theme.metrics.x4,
            width: theme.metrics.x4,
            borderRadius: 50,
            borderColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: theme.metrics.borderWidth,
        },
        colorImage: {
            height: '100%',
            width: '100%',
            borderRadius: 50
        },
        blackTextSmall: {
            fontSize: theme.metrics.x3,
            marginLeft: theme.metrics.x05
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        grayLabel: {
            color: theme.colors.silver,
            fontSize: theme.fonts.sizes.h4,
            fontWeight: '500'
        },
        blackSmallText: {
            fontSize: theme.fonts.sizes.h4,
            fontWeight: '500'
        },
        priceText: {
            fontSize: theme.fonts.sizes.h1,
            fontWeight: '600',
            marginLeft: theme.metrics.x3
        },
        footer: {
            height: 44,
            backgroundColor: theme.colors.lightGray3,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.gray,
            flexDirection: `row`,
            justifyContent: `space-between`,
            paddingHorizontal: theme.metrics.x4,
            alignItems: `center`
        },
        footerValue: {
            flexDirection: `row`,
            justifyContent: `space-between`,
            paddingHorizontal: theme.metrics.x4,
            backgroundColor: theme.colors.lightGray3,
            alignItems: `center`,
            height: 46
        },
        footerTextValue: {
            fontSize: 18,
            fontWeight: "500",
            color: theme.colors.black
        },
        footerText: {
            fontSize: 13,
            color: theme.colors.gray7,
            fontWeight: "400"
        },
        starText: {
            color: theme.colors.lightBlue2
        },
        picker: {
            width: `100%`,
            color: theme.colors.silver,

        },
        pickerWrapper: {
            flexDirection: `row`,
            width: `45%`
        }
    });