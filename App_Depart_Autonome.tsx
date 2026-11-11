import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
type Evenements = {id: string;
titre: string;
categorie: string;
capacite: number;
inscrits:number;
};
const evenements: Evenements[] = [
 {id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits:25 },
 {id: 'E02', titre: 'Conference IA', categorie: 'Conference', capacite: 70, inscrits:52 },
 {id: 'E03', titre: 'Securite mobile', categorie: 'Atelier', capacite: 20, inscrits:17 },
 {id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits:9 }, 
 {id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits:49 },
 {id: 'E06', titre: 'Decouverte Git', categorie: 'Atelier', capacite: 24, inscrits:24 },
];
function placesRestantes(e: Evenements): number {
  const places = e.capacite - e.inscrits;
return places >= 0 ? places : 0;
}
function statutEvenement(e: Evenements): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}
const nombreComplet = evenements.filter(
  e => statutEvenement(e) === 'Complet'
).length;
const nombreTotal = evenements.length;
const nombreAvecPlaces = evenements.filter(
  e => placesRestantes(e) > 0
).length;
const totalPlaces = evenements.reduce(
  (somme, e) => somme + placesRestantes(e), 0
);
const nombreOuverts = evenements.filter(
  e => statutEvenement(e) === 'Ouvert'
).length;
const nombreAteliersDisponibles = evenements.filter(
  e => e.categorie === 'Atelier' && placesRestantes(e) > 0
).length;
type BadgeEtatProps = { statut: string };
function BadgeEtat({ statut }: BadgeEtatProps) {
  const complet = statut === 'Complet';
  const presque = statut === 'Presque complet';

  return (
    <View style={[
      styles.badge,
      complet ? styles.badgeComplet :
      presque ? styles.badgePresque : styles.badgeOuvert
    ]}>
      <Text style={styles.texteBadge}>{statut}</Text>
    </View>
  );
}
type CarteEvenementProps = { evenement: Evenements };
function CarteEvenement({ evenement }: CarteEvenementProps) {
  const { titre, categorie } = evenement;
  const places = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={styles.carte}>
      <Text>{titre}</Text>
      <Text>{categorie}</Text>
      <Text>{places} place restante</Text>
      <BadgeEtat statut={statut} />
    </View>
  );
}
type BlocStatistiqueProps = {
  libelle: string;
  nombre: number;
};
function BlocStatistique({ libelle, nombre }: BlocStatistiqueProps) {
  return (
    <View style={styles.blocStatistique}>
      <Text>{libelle}</Text>
      <Text>{nombre}</Text>
    </View>
  );
}
const mode = 'tous';
const evenementsAffiches = evenements.filter(
  e => mode === 'tous' ||
  (e.categorie === 'Atelier' && placesRestantes(e) > 0)
);

export default function App() {
  return (
<View style={styles.page}>
<Text style={styles.titre}>CampusAgenda</Text>
<Text style={styles.sousTitre}>Mes événements</Text>
<BlocStatistique
  libelle="Événements au total"
  nombre={nombreTotal}
/>
<BlocStatistique
  libelle="Événements complets"
  nombre={nombreComplet}
/>
<BlocStatistique
  libelle="Événements avec des places"
  nombre={nombreAvecPlaces}
/>
<BlocStatistique
  libelle="Ateliers ayant encore des places"
  nombre={nombreAteliersDisponibles}
/>
<BlocStatistique
  libelle="Total des places restantes"
  nombre={totalPlaces}
/>
<FlatList
  data={evenementsAffiches}
  keyExtractor={item => item.id}
  ListEmptyComponent={<Text>Aucun événement disponible</Text>}
  renderItem={({ item }) => (
<CarteEvenement evenement={item} />
)}
/>
</View>
);}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 18,
    paddingBottom: 30,
    backgroundColor: '#F2F7FD',
  },

  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00235C',
    marginBottom: 6,
  },

  sousTitre: {
    fontSize: 18,
    color: '#596575',
    marginBottom: 22,
  },

  blocStatistique: {
    backgroundColor: '#DCEBFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  carte: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },

  badge: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },

  badgeComplet: {
    backgroundColor: '#FCE4E4',
  },

  badgePresque: {
    backgroundColor: '#FFF0D6',
  },

  badgeOuvert: {
    backgroundColor: '#D7F4E8',
  },

  texteBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00235C',
  },
});
