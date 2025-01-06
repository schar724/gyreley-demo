import { User, UserDirectory } from "@/types/user.type";
import { generateProfilePhoto } from "@/utils";
import {
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  GestureResponderEvent,
} from "react-native";

// Component to render individual users
function Item({
  user,
  onPress,
}: {
  user: User | null;
  onPress: (e: GestureResponderEvent) => void;
}) {
  if (user) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <img
          alt=""
          src={
            user?.imageUrl ||
            generateProfilePhoto(`${user.firstName} ${user.lastName}`)
          }
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-6 text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {user.email}
          </p>
        </div>
      </TouchableOpacity>
    );
  }
  return null;
}

// Component to render section headers (letters)
function SectionHeader({ letter }: { letter: string | undefined }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{letter}</Text>
    </View>
  );
}

type FlatListProps = {
  directory: UserDirectory;
  handlePress: (user: User | null) => void;
};

export default function MobileFlatList({
  directory,
  handlePress,
}: FlatListProps) {
  const data = Object.keys(directory).reduce<
    Array<{ isHeader: boolean; letter?: string; user?: User }>
  >(
    (acc, letter) => [
      ...acc,
      { isHeader: true, letter }, // Add a section header for the letter
      ...directory[letter].map((user) => ({ isHeader: false, user })), // Add the users under that letter
    ],
    [], // Initialize the accumulator as an empty array
  );

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }: { item: (typeof data)[0] }) =>
          item.isHeader ? (
            <SectionHeader letter={item.letter} />
          ) : (
            <Item
              user={item?.user || null}
              onPress={() => {
                handlePress(item?.user || null);
              }}
            />
          )
        }
        keyExtractor={(item: (typeof data)[0]) =>
          item.isHeader && item?.user?.email
            ? `header-${item.letter}`
            : item?.user?.email || ""
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
