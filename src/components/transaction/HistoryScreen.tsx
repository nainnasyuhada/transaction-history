import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import historyData from '@assets/mock-data/transaction-data.json'
import { Transaction } from '@types/transaction'


const HistoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {


  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { data: item})}>

      <Text>{item.description}</Text>
    </TouchableOpacity>

  )
  return (
    
    <SafeAreaView style={styles.container}>
      <FlatList
        data={historyData as Transaction[]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HistoryScreen