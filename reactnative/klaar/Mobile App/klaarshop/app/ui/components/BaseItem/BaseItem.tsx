/* eslint-disable react-native/no-unused-styles */
import * as React from 'react';
import { memo, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
    BaseNode,
    BaseNodeStyle,
    BaseNodeType
} from '~/ui/components/BaseNode';
import { Theme, useThemeContext } from '~/ui/theme';

export type BaseItemProps<
    L = BaseNodeType,
    C = BaseNodeType,
    R = BaseNodeType
    > = {
        children?: C;
        style?: ViewStyle;
        left?: L;
        right?: R;
        centerStyle?: BaseNodeStyle<C>;
        leftStyle?: BaseNodeStyle<L>;
        rightStyle?: BaseNodeStyle<R>;
        borderTop?: boolean;
        borderBottom?: boolean,
        marginBottom?: boolean
        marginTop?: boolean
    };

const BaseItem: React.FC<BaseItemProps> = ({
    children,
    style,
    left,
    right,
    centerStyle,
    leftStyle,
    rightStyle,
    borderTop,
    borderBottom,
    marginBottom,
    marginTop
}) => {
    const { s } = useThemeContext(createStyle);

    const containerStyle = useMemo(
        () => [
            s?.container,
            borderTop && s?.borderTop,
            borderBottom && s?.borderBottom,
            marginBottom && s?.marginBottom,
            marginTop && s?.marginTop,
            style
        ],
        [style, borderTop, s],
    );

    return (
        <View style={containerStyle}>
            {left ? (
                <BaseNode style={leftStyle}>{left}</BaseNode>
            ) : null}
            <BaseNode style={centerStyle || s?.center}>{children}</BaseNode>
            {right ? (
                <BaseNode style={rightStyle || s?.horizontalPadding}>{right}</BaseNode>
            ) : null}
        </View>
    );
};

const MBaseItem = memo(BaseItem);

export { MBaseItem as BaseItem };

function createStyle(theme: Theme) {
    return StyleSheet.create({
        horizontalPadding: {
            paddingHorizontal: theme.metrics.x7,
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            //alignSelf: 'stretch',
            height: 120,
            // backgroundColor: theme.colors.background,
            paddingVertical: theme.metrics.x2,
            //marginVertical: theme.metrics.x2,
        },
        center: {
            flex: 1,
            textAlign: `right`,
            color: theme.colors.gray7,
            fontWeight: "400",
            fontSize: 17
        },
        marginBottom: {
            marginBottom: theme.metrics.x6
        },
        marginTop: {
            marginTop: theme.metrics.x6
        },
        borderTop: {
            borderColor: theme.colors.gray,
            borderTopWidth: theme.metrics.borderWidth
            //borderRadius: theme.metrics.borderRadius,
        },
        borderBottom: {
            borderColor: theme.colors.gray4,
            borderBottomWidth: theme.metrics.borderWidth
        }
    });
}
