import { TextInput, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY, PRIMARY } from '../colors';
import { forwardRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};
export const IconNames = {
  EMAIL: 'email',
  PASSWORD: 'lock',
};

const Input = forwardRef(
  ({ title, placeholder, value, iconName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            value && styles.hasValueTitle,
            isFocused && styles.focusTitle,
          ]}
        >
          {title}
        </Text>
        <View>
          <TextInput
            ref={ref}
            {...props}
            value={value}
            style={[
              styles.input,
              value && styles.hasValueInput,
              isFocused && styles.focusInput,
            ]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          ></TextInput>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={(() => {
                switch (true) {
                  case isFocused:
                    return PRIMARY.DEFAULT;
                  case !!value:
                    return BLACK;
                  default:
                    return GRAY.DEFAULT;
                }
              })()}
            />
          </View>
        </View>
      </View>
    );
  }
);
Input.displayName = 'Input';
Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },
  focusTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: GRAY.DEFAULT,
    height: 42,
    paddingLeft: 30,
  },
  focusInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  hasValueInput: {
    color: BLACK,
    borderColor: BLACK,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
