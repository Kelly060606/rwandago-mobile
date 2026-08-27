import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- Types & Interfaces ---
interface Guide {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: string;
  reviews: string;
  pricePerDay: string;
  avatar: string;
  isVerified: boolean;
}

export default function GuideSearchScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // --- Real Rwandan Tour Guide Content Data Maps ---
  const tourGuides: Guide[] = [
    {
      id: 'g_1',
      name: 'Jean-Claude Uwiringiyimana',
      specialty: 'Volcanoes National Park Gorilla Tracking Expert',
      languages: ['English', 'Kinyarwanda', 'French'],
      rating: '4.9',
      reviews: '142',
      pricePerDay: '$50',
      avatar: 'https://unsplash.com',
      isVerified: true,
    },
    {
      id: 'g_2',
      name: 'Divine Mutoni',
      specialty: 'Nyungwe Canopy Walk & Birdwatching Specialist',
      languages: ['English', 'Kinyarwanda', 'Swahili'],
      rating: '4.8',
      reviews: '96',
      pricePerDay: '$40',
      avatar: 'https://unsplash.com',
      isVerified: true,
    },
    {
      id: 'g_3',
      name: 'Emmanuel Kwizera',
      specialty: 'Akagera Savannah Big Five Safari Tracker',
      languages: ['English', 'Kinyarwanda', 'French', 'Swahili'],
      rating: '4.9',
      reviews: '118',
      pricePerDay: '$45',
      avatar: 'https://unsplash.com',
      isVerified: true,
    },
  ];

  // --- Render Guide Profile Card Layout ---
  const renderGuideCard = ({ item }: { item: Guide }) => {
    return (
      <TouchableOpacity 
        style={styles.guideCard}
        onPress={() => navigation.navigate('GuideProfile', { guide: item })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        
        <View style={styles.guideDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.guideName} numberOfLines={1}>{item.name}</Text>
            {item.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#113F26" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.specialtyText} numberOfLines={2}>{item.specialty}</Text>
          
          {/* Spoken Languages List Row */}
          <View style={styles.languagesRow}>
            {item.languages.map((lang, index) => (
              <View key={index} style={styles.langPill}>
                <Text style={styles.langText}>{lang}</Text>
              </View>
            ))}
          </View>

          {/* Ratings and Pricing Summary Metrics */}
          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#E0A928" />
              <Text style={styles.ratingText}>{item.rating} <Text style={styles.reviewsText}>({item.reviews})</Text></Text>
            </View>
            <Text style={styles.priceText}>{item.pricePerDay}<Text style={styles.priceSub}>/day</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9F8" />
      
      {/* --- Header Component --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1E2220" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connect with Guides</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {/* --- Filter Search Box Component --- */}
      <View style={styles.searchSection}>
        <Ionicons name="options-outline" size={18} color="#113F26" style={{ marginRight: 10 }} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Filter by name, region, or expertise..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* --- Horizontal Language Quick Filters --- */}
      <View style={styles.filterLabelRow}>
        <Text style={styles.filterTitle}>Languages Spoken</Text>
      </View>
      <View style={styles.quickFilterBar}>
        {['All', 'English', 'French', 'Swahili'].map((lang) => (
          <TouchableOpacity 
            key={lang}
            style={[styles.filterPill, selectedLanguage === lang && styles.activeFilterPill]}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text style={[styles.filterPillText, selectedLanguage === lang && styles.activeFilterPillText]}>
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- Tour Guides Directory Feed List --- */}
      <FlatList
        data={tourGuides}
        renderItem={renderGuideCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2220',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E2220',
  },
  filterLabelRow: {
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  quickFilterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterPill: {
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ECEFF0',
  },
  activeFilterPill: {
    backgroundColor: '#113F26',
    borderColor: '#113F26',
  },
  filterPillText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterPillText: {
    color: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  guideCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#ECEFF0',
  },
  guideDetails: {
    flex: 1,
    paddingLeft: 14,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guideName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2220',
    flex: 1,
    paddingRight: 6,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0EA', 
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#113F26',
    marginLeft: 2,
  },
  specialtyText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginVertical: 4,
  },
  languagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  langPill: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  langText: {
    fontSize: 10,
    color: '#113F26',
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
    paddingTop: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E2220',
    marginLeft: 4,
  },
  reviewsText: {
    fontWeight: '400',
    color: '#666',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#113F26',
  },
  priceSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666',
  },
});
