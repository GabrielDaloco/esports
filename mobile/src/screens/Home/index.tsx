import { View, Image, FlatList } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';
import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      >
      </Heading>

      <FlatList
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={GAMES}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <GameCard
            data={item}
          />
        )}
      />
    </View>
  );
}