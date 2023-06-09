import { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { styles } from './styles';
import { ImageSelector } from '../../components';
import Input from '../../components/input';
import ModalContainer from '../../components/modalContainer';
import { theme } from '../../constants/theme';
import { addRecipe } from '../../store/actions';

const NewRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [image, setImage] = useState('');
  const [recipe, setRecipe] = useState({
    id: '',
    title: '',
    steps: [],
    ingredients: [],
    imgUrl: '',
  });
  const dispatch = useDispatch();

  const AddIngredient = () => {
    if (ingredient.length === 0) return;

    const newRecipe = { ...recipe };
    newRecipe['ingredients'].push(ingredient);
    setRecipe(newRecipe);

    setIngredient('');
  };

  const AddStep = () => {
    if (step.length === 0) return;

    const newRecipe = { ...recipe };
    newRecipe['steps'].push(step);
    setRecipe(newRecipe);

    setStep('');
  };

  const AddRecipe = () => {
    const newRecipe = { ...recipe };

    if (
      title.length === 0 ||
      newRecipe['steps'].length == 0 ||
      newRecipe['ingredients'].length == 0 ||
      image == '' ||
      image == undefined
    ) {
      setTextModal('Debe completar todos los datos');
      setIsVisible(true);
      return;
    }
    newRecipe['imgUrl'] = image;
    newRecipe['title'] = title;
    dispatch(addRecipe(newRecipe));
    setTextModal('Receta agregada exitosamente');
    setIsVisible(true);
    resetNewRecipe();
  };

  const resetNewRecipe = () => {
    const recipe = {
      id: '',
      title: '',
      steps: [],
      ingredients: [],
      imgUrl: '',
    };
    setTitle('');
    setRecipe(recipe);
    setImage('');
  };

  const renderItem = ({ item }) => <Text>{item}</Text>;

  const SetVisible = () => {
    setIsVisible(!isVisible);
  };

  const onImage = (imageUri) => {
    setImage(imageUri);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}> Nombre de la receta:</Text>
          <TextInput
            placeholder="Pizza"
            style={styles.inputTitle}
            value={title}
            onChangeText={(val) => setTitle(val)}
          />
        </View>
        <View>
          <Text style={styles.title}> Ingredientes</Text>
          <Input
            placeholder="Tomate"
            text={ingredient}
            onChangeText={(val) => setIngredient(val)}
            buttonTitle="Agregar"
            buttonColor={theme.colors.primary}
            onPressButton={AddIngredient}
          />
          <FlatList
            renderItem={renderItem}
            style={styles.listContainer}
            data={recipe.ingredients}
            keyExtractor={(item) => item}
          />
        </View>
        <View>
          <Text style={styles.title}> Pasos</Text>
          <Input
            placeholder="Agregar ingredientes y mezclar"
            text={step}
            onChangeText={(val) => setStep(val)}
            buttonTitle="Agregar"
            buttonColor={theme.colors.primary}
            onPressButton={AddStep}
          />
          <FlatList
            style={styles.listContainer}
            renderItem={renderItem}
            data={recipe.steps}
            keyExtractor={(item) => item}
          />
        </View>
        <View>
          <Text style={styles.title}>Tomar foto de tu receta</Text>
        </View>
        <ImageSelector onImage={onImage} pickedUrl={image} />
        <View>
          <Button title="Agregar receta" style={styles.buttonAdd} onPress={AddRecipe} />
        </View>
        <ModalContainer text={textModal} isVisible={isVisible} onConfirmButton={SetVisible} />
      </View>
    </ScrollView>
  );
};

export default NewRecipe;
