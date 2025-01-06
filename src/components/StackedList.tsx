import { StyleSheet, TouchableOpacity } from "react-native";

type StackedListProps<T> = {
  directory: Record<string, T[]>;
  handleTouchEvent: (item: T) => void;
  getTitle: (item: T) => string;
  getSubText: (item: T) => string;
  getImageSrc?: (item: T) => string;
};

export default function StackedList<T>({
  directory,
  handleTouchEvent,
  getTitle,
  getSubText,
  getImageSrc,
}: StackedListProps<T>) {
  return (
    <nav aria-label="Directory" className="h-full overflow-y-auto">
      {Object.keys(directory).map((letter) => (
        <div key={letter} className="relative">
          <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
            <h3>{letter}</h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {directory[letter].map((item) => (
              <li key={getTitle(item)} className="flex gap-x-4 px-3 py-5">
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleTouchEvent(item)}
                >
                  <div className="flex gap-x-4 items-center">
                    {getImageSrc && (
                      <img
                        alt=""
                        src={getImageSrc(item)}
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {getTitle(item)}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {getSubText(item)}
                      </p>
                    </div>
                  </div>
                </TouchableOpacity>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
  },
});
