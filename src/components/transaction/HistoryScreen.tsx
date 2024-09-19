import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  SectionList,
  RefreshControl,
  Alert,
} from 'react-native';
import mockData from '@assets/data/transaction-data.json';
import {Transaction} from '../../types/transaction';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {MaskedText} from 'react-native-mask-text';

import {onCheckBiometric} from '@components/auth/checkAuthentication';

const HistoryScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [historyData, setHistoryData] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  // Simulating data fetching
  const fetchData = () => {
    return mockData;
  };

  useEffect(() => {
    const data = fetchData();
    setHistoryData(data as Transaction[]);
  }, [mockData]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulating a network request
    setTimeout(() => {
      const data = fetchData(); // Re-fetch or update data
      setHistoryData(data as Transaction[]);
      setRefreshing(false);
    }, 2000);
  };

  const sections = historyData.reduce((acc, item) => {
    const formattedDate = moment(item.date).format('DD MMM YYYY');
    const existingSection = acc.find(section => section.date === formattedDate);

    if (existingSection) {
      existingSection.data.push(item);
    } else {
      acc.push({
        date: formattedDate,
        data: [item],
      });
    }

    return acc;
  }, []);

  const renderItem = ({item}: {item: Transaction}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('Details', item)}>
      <View style={styles.transactionRow}>
        <View>
          <Text style={[styles.transactionDetails, {marginBottom: 4}]}>
            {moment(item.date).format('DD MMM YYYY HH:mm')}
          </Text>
          <Text style={styles.transactionDetails}>{item.description}</Text>
        </View>

        <View style={styles.transactionAmt}>
          {item.type === 'credit' ? (
            <Text style={styles.transactionCredit}>+</Text>
          ) : (
            <Text style={styles.transactionDebit}>-</Text>
          )}
          <Text
            style={
              item.type === 'credit'
                ? styles.transactionCredit
                : styles.transactionDebit
            }>
            {' '}
            RM
          </Text>
          {isHidden ? (
            <MaskedText
              mask="***"
              style={
                item.type === 'credit'
                  ? styles.transactionCredit
                  : styles.transactionDebit
              }>{`${item.amount.toFixed(2)}`}</MaskedText>
          ) : (
            <Text
              style={
                item.type === 'credit'
                  ? styles.transactionCredit
                  : styles.transactionDebit
              }>
              {item.amount.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: {date},
  }: {
    section: {date: string};
  }) => <Text style={styles.sectionHeader}>{date}</Text>;

  const onShowAmount = async (value: boolean) => {
    if (value) {
      const resp = await onCheckBiometric();

      switch (resp) {
        case 'fail-notAvailable':
          Alert.alert('Oops!', 'Face ID is not available on this device.');
          break;
        case 'fail-auth':
          Alert.alert('Oops!', 'Failed to authenticate with face ID.');
          break;
        default:
          setIsHidden(false);
          break;
      }
    } else {
      setIsHidden(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hideRow}>
        {isHidden ? (
          <TouchableOpacity onPress={() => onShowAmount(true)}>
            <Text style={[styles.showText, {color: '#007fdc'}]}>
              Show Amount
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onShowAmount(false)}>
            <Text style={[styles.showText, {color: 'grey'}]}>Hide Amount</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        {/* {mockData.map(item => renderItem({item}))} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  divider: {
    backgroundColor: 'lightgrey',
    height: 1,
    width: '100%',
  },
  hideRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionHeader: {
    backgroundColor: 'lightgrey',
    color: 'black',
    fontSize: 16,
    fontWeight: 500,
    padding: 8,
    width: '100%',
  },
  showText: {
    color: '#007fdc',
    fontSize: 16,
    fontWeight: 600,
    marginVertical: 12,
  },
  transactionAmt: {
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: 300,
  },
  transactionCredit: {
    color: 'green',
  },
  transactionDetails: {
    color: '#000',
    fontSize: 14,
    fontWeight: 300,
  },
  transactionDebit: {
    color: 'red',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 8,
    alignItems: 'flex-end',
    width: '100%',
  },
});

export default HistoryScreen;
