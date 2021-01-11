import React, { Component } from 'react';
import { Container, H3, Left, Right, Text ,Card ,CardItem,Icon} from 'native-base';

const CategoryCard = (props) =>{
    const {navigation,Category} = props;

    return (
      <Card>
        <CardItem header button onPress={() => navigation.navigate('Notes',{CategoryId:Category.CategoryID,CategoryTitle:Category.CategoryTitle})}>
             <Left>
               <H3>{Category.CategoryTitle}</H3>
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
