import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchIcon from '../../../assets/icon/search1.svg';
import Menu from '../../../assets/icon/menu.svg';

const SearchBar = () => {
  return (
    <View
      style={{
        backgroundColor: 'green',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>ChatMe</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingRight: 20}}>
          <SearchIcon width={25} height={25} />
        </View>
        <Menu width={20} height={20} />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
