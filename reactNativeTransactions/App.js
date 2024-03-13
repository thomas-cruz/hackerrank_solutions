import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Transactions from "./Transactions";
import Header from "./Header";
import TXNS from './transactions.json'

const App = () => {
    const [txnType, setTxnType] = useState('all');
    const [transactions, setTransactions] = useState(TXNS);

    useEffect(() => {
        if (txnType === 'credit') {
            setTransactions(TXNS.filter(item => item.txnType === 'credit'));
        } else if (txnType === 'debit') {
            setTransactions(TXNS.filter(item => item.txnType === 'debit'));
        } else {
            setTransactions(TXNS);
        }
    }, [txnType]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.frame}>
                <Header
                    transactionType={txnType}
                    setType={setTxnType}
                />
                <Transactions
                    transactions={transactions}
                />
            </View>
        </SafeAreaView>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#201f1f'
    },
    frame: {
        maxWidth: 500,
        flex: 1,
        justifyContent: 'center'
    }
})

