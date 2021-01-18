import React, { Component } from 'react';
import { H3, Left, Right,Card ,CardItem,Icon} from 'native-base';
import { StyleSheet } from 'react-native';

const CategoryCard = (props) =>{
    const {navigation,Category} = props;

    return (
      <Card style={styles.card}>
        <CardItem header button onPress={() => navigation.navigate('Notes',{CategoryId:Category.CategoryID,CategoryTitle:Category.CategoryTitle})}>
             <Left>
               <H3 style={styles.H3}>{Category.CategoryTitle}</H3>
             </Left>
             <H3>{Category.NoteCounter} Notes</H3>
             <Right>
                <Icon name="arrow-forward" />
             </Right>
        </CardItem>
      </Card>
    );
}
export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    borderRadius:10,
  },
  H3:{
    fontWeight:'bold',
  },
});