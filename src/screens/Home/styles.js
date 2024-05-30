import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20202C",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  artistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFF',
  },
  cardContainer: {
    paddingHorizontal: 5,  // Ajuste o padding para diminuir o espaço entre os itens
  },
  carouselContent: {
    alignItems: 'center',  
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});

export default styles;
