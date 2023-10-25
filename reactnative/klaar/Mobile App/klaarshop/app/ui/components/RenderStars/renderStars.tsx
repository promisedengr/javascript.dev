import * as React from 'react';
import { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import EmptyStar from '~/ui/components/ReviewItem/assets/emptyStar';
import Star from '~/ui/components/ReviewItem/assets/star';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from '~/ui/components/ReviewItem/ReviewItemStyles';
import { theme } from '~/ui/theme/default/theme';

type RenderStarsProps = {
    rating?: number;
    onRatingChange?: (idx: number) => void
    size?: number
}

const RenderStars: React.FC<RenderStarsProps> = props => {
    const {
        rating = 0,
        onRatingChange = () => 1,
        size = 18
    } = props;

    const renderStars = (rating: number) => {
        const { s } = useThemeContext(createStyle);
        let indents = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                indents.push(
                    <TouchableOpacity onPress={() => onRatingChange(i + 1)} style={s?.starIconMargin} key={i}>
                        <Star color={theme.colors.lightBlue2} w={size} h={size} />
                    </TouchableOpacity>
                );
            } else {
                indents.push(
                    <TouchableOpacity onPress={() => onRatingChange(i + 1)} style={s?.starIconMargin} key={i}>
                        <EmptyStar w={size} h={size} />
                    </TouchableOpacity>
                );
            }
        }
        return indents;
    }

    return (<>
        { renderStars(rating)}
    </>);
};

const MRenderStars = memo(RenderStars);
export { MRenderStars as RenderStars };