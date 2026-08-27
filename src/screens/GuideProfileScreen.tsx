import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Package {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
}

export default function GuideProfileScreen({ route, navigation }: any) {
  // Safe default fallback data mapping if a guide object isn't routed yet
  const guide = route?.params?.guide || {
    name: 'Jean-Claude Uwiringiyimana',
    specialty: 'Volcanoes National Park Gorilla Tracking Expert',
    languages: ['English', 'Kinyarwanda', 'French'],
    rating: '4.9',
    reviews: '142',
    pricePerDay: '$50',
    avatar: 'https://unsplash.com',
    isVerified: true,
  };

  // Sample Custom Tour Packages offered by this specific guide
  const packages: Package[] = [
    {
      id: 'p_1',
      title: 'Premium Mountain Gorilla Trekking Expedition',
      duration: '1 Day',
      price: '$1,500',
      description: 'Includes full permit assistance, early briefing logistics, an unhurried bamboo forest track, and a cultural tour at Iby’Iwacu Village.',
    },
    {
      id: 'p_2',
      title: 'Twin Lakes & Musanze Caves Discovery Loop',
      duration: '2 Days',
      price: '$180',
      description: 'Explore the historic volcanic caves of Musanze followed by a relaxing traditional canoe trek across Lake Burera and Ruhondo.',
    },
  ];

  const renderPackageCard = ({ item }: { item: Package }) => {
    return (
      <View style={styles.packageCard}>
        <View style={styles.packageHeader}>
          <Text style={styles.packageTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={12} color="#113F26" />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
        <Text style={styles.packageDescription}>{item.description}</Text>
        <View style={styles.packageFooter}>
          <Text style={styles.packagePrice}>{item.price}<Text style={styles.priceLabelSub}> /person</Text></Text>
          <TouchableOpacity 
            style={styles.selectPackageButton}
            onPress={() => navigation.navigate('Booking', { guide, selectedPackage: item })}
            activeOpacity={0.8}
          >
            <Text style={styles.selectButtonText}>Select Package</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Navigation Header bar */}
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1E2220" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guide Portfolio</Text>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="share-social-outline" size={20} color="#1E2220" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* Profile Card Header Segment */}
        <View style={styles.profileSection}>
          <Image source={{ uri: guide.avatar }} style={styles.largeAvatar} />
          <Text style={styles.guideName}>{guide.name}</Text>
          
          <View style={styles.metaBadgeRow}>
            {guide.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#113F26" />
                <Text style={styles.verifiedText}>Verified Expert</Text>
              </View>
            )}
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#E0A928" />
              <Text style={styles.ratingText}>{guide.rating} ({guide.reviews} reviews)</Text>
            </View>
          </View>

          <Text style={styles.specialtyHeading}>{guide.specialty}</Text>
        </View>

        {/* Bio Description Information */}
        <View style={styles.bioContainer}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>
            Hello! I am passionate about sharing the natural biodiversity and cultural wonders of Rwanda. With extensive tracking experience certified by local authorities, I specialize in making your journey deep into our forests safe, deeply educational, and unforgettable.
          </Text>

          <Text style={styles.languagesLabel}>Languages Spoken</Text>
          <View style={styles.languagesContainer}>
            {guide.languages.map((lang: string, index: number) => (
              <View key={index} style={styles.langBadge}>
                <Text style={styles.langText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Available Custom Packages Section */}
        <View style={styles.packagesContainer}>
          <Text style={styles.sectionTitle}>Available Tour Packages</Text>
          <FlatList
            data={packages}
            renderItem={renderPackageCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // Relying on master window scrolling layouts
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2220',
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  profileSection: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 14,
  },
  guideName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2220',
    textAlign: 'center',
  },
  metaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#113F26',
    marginLeft: 3,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
  },
  specialtyHeading: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  bioContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2220',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  languagesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  langBadge: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  langText: {
    fontSize: 11,
    color: '#113F26',
    fontWeight: '600',
  },
  packagesContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  packageCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2220',
    flex: 1,
    paddingRight: 12,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#113F26',
    marginLeft: 3,
  },
  packageDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 14,
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
    paddingTop: 12,
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#113F26',
  },
  priceLabelSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666',
  },
  selectPackageButton: {
    backgroundColor: '#113F26',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
