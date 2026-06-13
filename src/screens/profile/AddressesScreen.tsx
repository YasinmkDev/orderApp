import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAddresses } from '../../hooks';
import { customerAddressService } from '../../services';
import { ArrowLeft, MapPin, Plus } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

export const AddressesScreen: React.FC<Props> = ({ navigation }) => {
  const { data: addresses } = useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddAddress = async () => {
    if (!label.trim() || !address.trim() || !city.trim()) return;
    setIsSaving(true);
    try {
      await customerAddressService.add({
        label,
        address,
        city,
        zipCode,
        branchId: '1',
        isDefault: false,
      });
      setShowForm(false);
      setLabel('');
      setAddress('');
      setCity('');
      setZipCode('');
    } catch {
      Alert.alert('Error', 'Failed to add address. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text variant="h3">Addresses</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.addButton}>
          <Plus size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Add Address Form */}
        {showForm && (
          <Card padding="lg" style={styles.formCard}>
            <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>New Address</Text>
            <Input label="Label" placeholder="Home, Office..." value={label} onChangeText={setLabel} />
            <Input label="Street Address" placeholder="123 Main St" value={address} onChangeText={setAddress} />
            <View style={styles.row}>
              <View style={styles.half}>
                <Input label="City" placeholder="City" value={city} onChangeText={setCity} />
              </View>
              <View style={styles.half}>
                <Input label="ZIP Code" placeholder="12345" value={zipCode} onChangeText={setZipCode} keyboardType="numeric" />
              </View>
            </View>
            <Button title="Save Address" onPress={handleAddAddress} loading={isSaving} style={styles.fullWidth} />
          </Card>
        )}

        {/* Address List */}
        {addresses.map(addr => (
          <Card key={addr.id} padding="md" style={styles.addressCard}>
            <View style={styles.addressRow}>
              <View style={styles.addressIcon}>
                <MapPin size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.addressInfo}>
                <View style={styles.addressLabelRow}>
                  <Text variant="body" weight="medium">{addr.label}</Text>
                  {addr.isDefault && <Badge label="Default" variant="primary" size="sm" />}
                </View>
                <Text variant="body" color="secondary">{addr.address}, {addr.city}</Text>
              </View>
            </View>
          </Card>
        ))}

        {addresses.length === 0 && !showForm && (
          <View style={styles.empty}>
            <Text variant="body" color="secondary" style={styles.centerText}>No saved addresses</Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { flex: 1, paddingHorizontal: theme.spacing.lg },
  formCard: { marginBottom: theme.spacing.md },
  row: { flexDirection: 'row', gap: theme.spacing.md },
  half: { flex: 1 },
  fullWidth: { width: '100%' },
  addressCard: { marginBottom: theme.spacing.md },
  addressRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressInfo: { flex: 1, gap: theme.spacing.xs },
  addressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  empty: {
    paddingVertical: theme.spacing.xxxl,
  },
  centerText: {
    textAlign: 'center',
  },
  bottomPadding: { height: 40 },
});
