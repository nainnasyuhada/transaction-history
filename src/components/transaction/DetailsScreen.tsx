import {RouteProp, useRoute} from '@react-navigation/native';
import {Transaction} from '@types/transaction';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface DetailsScreenProps {
  key: string;
  label: string;
  value: string;
}
const DetailsScreen: React.FC = ({}) => {
  const {params} = useRoute<
    RouteProp<
      {
        params: Transaction;
      },
      'params'
    >
  >();

  const data: DetailsScreenProps[] = [
    {
      key: 'id',
      label: 'Reference ID',
      value: params.id,
    },
    {
      key: 'date',
      label: 'Date',
      value: moment(params.date).format('DD MMM YYYY HH:mm'),
    },
    {
      key: 'description',
      label: 'Description',
      value: params.description,
    },
  ];

  const RenderDetails = () => {
    return (
      <View>
        {data.map((item: DetailsScreenProps) => (
          <View key={item.key} style={styles.detailsRow}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            params.type === 'credit'
              ? require('../../assets/img/credit-icon.png')
              : require('../../assets/img/debit-icon.jpg')
          }
          style={styles.image}
        />
        <Text
          style={[
            styles.amount,
            {color: params.type === 'credit' ? 'green' : 'red'},
          ]}>
          {params.type === 'credit' ? <Text>+</Text> : <Text>-</Text>} {''}
          RM {params.amount.toFixed(2)}
        </Text>
      </View>

      <RenderDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 24,
    fontWeight: 500,
    marginTop: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  label: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 300,
  },
  image: {
    width: 50,
    height: 50,
  },
  value: {
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
  },
});

export default DetailsScreen;
