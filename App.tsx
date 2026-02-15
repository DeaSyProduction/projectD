import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

type QuizQuestion = {
  id: number;
  text: string;
  answers: string[];
  correctIndex: number;
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Утро в городе. Твой первый ресурс для выживания?',
    answers: ['Кофе навынос', 'План на день', 'Харизма и удача', 'Пауэрбанк'],
    correctIndex: 1
  },
  {
    id: 2,
    text: 'Какой скилл самый полезный для уличного философа?',
    answers: [
      'Ораторское искусство',
      'Умение находить розетки',
      'Невидимость в очередях',
      'Переговоры с охраной'
    ],
    correctIndex: 0
  },
  {
    id: 3,
    text: 'Твоя тактика, если начался ливень без зонта:',
    answers: [
      'Спрятаться в метро',
      'Сделать вид, что это спа-процедура',
      'Поймать такси взглядом',
      'Устроить стендап под навесом'
    ],
    correctIndex: 0
  },
  {
    id: 4,
    text: 'Главный закон саркастичного выживальщика?',
    answers: [
      'Всегда иметь план Б',
      'Всегда иметь мем',
      'Всегда иметь плед',
      'Всегда иметь монетку для автомата'
    ],
    correctIndex: 0
  },
  {
    id: 5,
    text: 'Финал: что важнее всего в трудной ситуации?',
    answers: ['Достоинство', 'Подписчики', 'Случайный лайфхак', 'Шапка с помпоном'],
    correctIndex: 0
  }
];

const getResultLabel = (score: number, total: number): string => {
  const ratio = score / total;

  if (ratio >= 0.8) {
    return 'Ты мастер городского квеста. Ирония + здравый смысл = победа.';
  }

  if (ratio >= 0.5) {
    return 'Неплохо! Ты держишься уверенно, но сарказм можно прокачать.';
  }

  return 'Это был обучающий рейд. В следующий раз будет эпичнее.';
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentIndex];
  const isFinished = started && currentIndex >= QUESTIONS.length;

  const resultText = useMemo(
    () => getResultLabel(score, QUESTIONS.length),
    [score]
  );

  const startQuiz = () => {
    setStarted(true);
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        {!started && (
          <>
            <Text style={styles.title}>Street Quiz</Text>
            <Text style={styles.subtitle}>
              Сатирическая викторина о выживании в большом городе.
            </Text>
            <Text style={styles.disclaimer}>
              Дисклеймер: шутим про ситуации, а не про ценность людей.
            </Text>
            <Pressable style={styles.button} onPress={startQuiz}>
              <Text style={styles.buttonText}>Начать</Text>
            </Pressable>
          </>
        )}

        {started && !isFinished && (
          <>
            <Text style={styles.progress}>
              Вопрос {currentIndex + 1} / {QUESTIONS.length}
            </Text>
            <Text style={styles.question}>{currentQuestion.text}</Text>

            <View style={styles.answersWrap}>
              {currentQuestion.answers.map((answer, index) => (
                <Pressable
                  key={answer}
                  style={styles.answerButton}
                  onPress={() => handleAnswer(index)}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {isFinished && (
          <>
            <Text style={styles.title}>Результат</Text>
            <Text style={styles.score}>
              {score} / {QUESTIONS.length}
            </Text>
            <Text style={styles.result}>{resultText}</Text>
            <Pressable style={styles.button} onPress={startQuiz}>
              <Text style={styles.buttonText}>Пройти ещё раз</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  card: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 18,
    backgroundColor: '#1e293b',
    padding: 20,
    gap: 14
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center'
  },
  subtitle: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 16
  },
  disclaimer: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 13,
    fontStyle: 'italic'
  },
  button: {
    marginTop: 8,
    backgroundColor: '#22c55e',
    paddingVertical: 13,
    borderRadius: 12
  },
  buttonText: {
    color: '#052e16',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
  progress: {
    color: '#86efac',
    textAlign: 'center',
    fontWeight: '600'
  },
  question: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  answersWrap: {
    gap: 10,
    marginTop: 6
  },
  answerButton: {
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 12
  },
  answerText: {
    color: '#e2e8f0',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500'
  },
  score: {
    color: '#f8fafc',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 38
  },
  result: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 16
  }
});
