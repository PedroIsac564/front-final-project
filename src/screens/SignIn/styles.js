import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    padding: 16,
  },
  containerScroll:{
    flexGrow: 1,
    marginBottom: 100
  },
  loginButton: {
    color: "#555555",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 24, 
    marginTop: 20
   },
  flr:{
    flexDirection: 'row',
    width: "100%"
  },
  input: {
    width: "100%",
    backgroundColor: '#333333',
    borderRadius: 8,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    paddingRight: 40,
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    outlineColor: 'gray',
  },
  eyeIcon:{
    position: 'absolute',
    right: 20,
    top: 10
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  signUpButton: {
    backgroundColor: '#555555', // Sign up button with a different shade for distinction
  },
  errorMessage: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 16,
  },
  successMessage: {
    color: '#00FF00',
    textAlign: 'center',
    marginTop: 16,
  },
  cadastre:{
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  }
});