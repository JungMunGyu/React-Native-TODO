import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

const SafeInputView = ({ children }) => {
  return (
    <KeyboardAvoidingView style={styles.avoid}>
      <Pressable style={styles.avoid} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

SafeInputView.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  avoid: { flex: 1 },
});
export default SafeInputView;
