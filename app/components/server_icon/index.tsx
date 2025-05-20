// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useMemo} from 'react';
import {Image, type StyleProp, StyleSheet, type TextStyle, View, type ViewStyle} from 'react-native';

import Badge from '@components/badge';
import {useTheme} from '@context/theme';

type Props = {
    badgeBackgroundColor?: string;
    badgeBorderColor?: string;
    badgeColor?: string;
    badgeStyle?: StyleProp<TextStyle>;
    hasUnreads: boolean;
    mentionCount: number;
    onPress?: () => void;
    size?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    unreadStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
    badge: {
        left: 13,
        top: -8,
    },
    unread: {
        left: 18,
        top: -5,
    },
    appIcon: {
        borderRadius: 6,
        overflow: 'hidden',
    },
});

export default function ServerIcon({
    badgeBackgroundColor,
    badgeBorderColor,
    badgeColor,
    badgeStyle,
    hasUnreads,
    mentionCount,
    size = 32,
    style,
    testID,
    unreadStyle,
}: Props) {
    const theme = useTheme();
    const hasBadge = Boolean(mentionCount || hasUnreads);
    const count = mentionCount || (hasUnreads ? -1 : 0);
    const memoizedStyle = useMemo(() => {
        return [(badgeStyle || styles.badge), count > -1 ? undefined : (unreadStyle || styles.unread)];
    }, [badgeStyle, count, unreadStyle]);

    return (
        <View style={style}>
            <Image
                source={require('@assets/images/logo.png')}
                style={[styles.appIcon, {width: size, height: size}]}
            />

            <Badge
                borderColor={badgeBorderColor || theme.sidebarTeamBarBg}
                backgroundColor={badgeBackgroundColor}
                color={badgeColor}
                visible={hasBadge}
                style={memoizedStyle}
                testID={`${testID}.badge`}
                value={count}
            />
        </View>
    );
}

