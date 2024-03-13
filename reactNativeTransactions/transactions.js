import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TransactionItem from './TransactionItem';

const Transactions = ({transactions}) => {

    return (
        <FlatList
            initialNumToRender={100}
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
        />
    )
}

export default Transactions;

const styles = StyleSheet.create({})

