import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { tokens } from '@mds/tokens';
import { assets } from '@mds/icons';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-mono';
  size?: 'large' | 'small';
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

function LoadingIcon({ size, tone }: { size: 'large' | 'small'; tone: 'primary' | 'inverse' | 'mono' }) {
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.timing(rotation, {
      toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver: true,
      isInteraction: false,
    }));
    animation.start();
    return () => animation.stop();
  }, [rotation]);
  const dimension = size === 'large' ? 24 : 16;
  return <Animated.View style={{ width: dimension, height: dimension,
    transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
    <SvgXml xml={assets[`spinner-native-${size === 'large' ? 'm' : 's'}-${tone}`]} />
  </Animated.View>;
}

export function Button({ label, variant = 'primary', size = 'large', loading = false,
  leadingIcon, trailingIcon, disabled, style, accessibilityState, ...props }: ButtonProps) {
  const small = size === 'small';
  const tone = variant === 'primary' ? 'inverse' : variant === 'tertiary' ? 'primary' : 'mono';
  return <Pressable {...props} accessibilityRole="button" accessibilityLabel={props.accessibilityLabel ?? label}
    disabled={disabled || loading} accessibilityState={{ ...accessibilityState, disabled: !!disabled || loading, busy: loading }}
    style={state => {
      const pressed = state.pressed && !disabled && !loading;
      const backgroundColor = variant === 'primary'
        ? pressed ? tokens.color.backgroundBrandPressed : tokens.color.backgroundBrand
        : pressed ? tokens.color.backgroundPressed : tokens.color.backgroundPrimary;
      return [styles.button, { backgroundColor, paddingVertical: small ? tokens.space.xs : tokens.space.m,
        paddingHorizontal: small ? tokens.space.s : tokens.space.m,
        borderRadius: small ? tokens.radius.s : tokens.radius.m,
        opacity: disabled && !loading ? 0.5 : 1 }, typeof style === 'function' ? style(state) : style];
    }}>
    {({ pressed }) => {
      const color = variant === 'primary' ? tokens.color.contentPrimaryInverse
        : variant === 'tertiary' ? pressed ? tokens.color.contentLinkPressed : tokens.color.contentLink
        : pressed ? tokens.color.contentPrimary : tokens.color.contentSecondary;
      const typography = small ? tokens.text.m : tokens.text.l;
      return <>
        {variant === 'secondary' && <View pointerEvents="none" style={[StyleSheet.absoluteFill, {
          borderRadius: small ? tokens.radius.s : tokens.radius.m, borderWidth: 1, borderColor: tokens.color.borderSecondary,
        }]} />}
        <View style={styles.content}>
          {loading ? <LoadingIcon size={size} tone={tone} /> : <>
            {leadingIcon && <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.icon}>{leadingIcon}</View>}
            <Text style={{ color, paddingHorizontal: tokens.space.xs, fontSize: typography.size,
              lineHeight: typography.lineHeight, letterSpacing: typography.letterSpacing, fontWeight: '600',
              fontFamily: Platform.OS === 'ios' ? tokens.font.ios : tokens.font.android }}>{label}</Text>
            {trailingIcon && <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.icon}>{trailingIcon}</View>}
          </>}
        </View>
      </>;
    }}
  </Pressable>;
}

const styles = StyleSheet.create({
  button: { alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' },
  content: { height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
});
