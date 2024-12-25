import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, Animated, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface Task {
  text: string; // text строго string
  completed: boolean;
}

export default function App() {
  const [task, setTask] = useState<string>(''); // Указываем, что task всегда string
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([{ text: task.trim(), completed: false }, ...tasks]); // Добавляем в начало массива
      setTask('');
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (index: number) => {
    const taskToEdit = tasks[index];
    Alert.prompt(
      'Edit Task',
      'Modify your task below:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: (newText) => {
            if (newText?.trim()) { // Проверяем, что текст не пустой
              setTasks(
                tasks.map((task, i) =>
                  i === index ? { ...task, text: newText.trim() } : task
                )
              );
            }
          },
        },
      ],
      'plain-text',
      taskToEdit.text // Передаём текущий текст задачи
    );
  };

  const clearAllTasks = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to delete all tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => setTasks([]),
        },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <LinearGradient
        colors={['#a8c0ff', '#3f2b96']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Мои задачи</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={task}
              onChangeText={setTask}
              placeholder="Добавить новую задачу"
              placeholderTextColor="rgba(44, 62, 80, 0.6)"
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={{ color: '#fff', fontSize: 28, fontWeight: '600' }}>+</Text>
            </TouchableOpacity>
          </View>
      
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <Animated.View style={styles.taskItem}>
                <TouchableOpacity 
                  style={[styles.checkbox, item.completed && styles.checkedBox]}
                  onPress={() => toggleComplete(index)}
                >
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                  {item.text}
                </Text>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteTask(index)}
                >
                  <Text style={styles.deleteButtonText}>Удалить</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </LinearGradient>
      <SafeAreaView style={styles.bottomSafeArea} />
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: '#a8c0ff',
  },
  bottomSafeArea: {
    flex: 0,
    backgroundColor: '#3f2b96',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#a8c0ff', // Цвет верхнего островка
  },
  container: {
    flex: 1,
    paddingTop: 50, // Отступ для контента
    paddingHorizontal: 20,
  },
  gradient: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#4834d4',
    borderRadius: 12,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  taskItem: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4834d4',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#4834d4',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'System',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
});
