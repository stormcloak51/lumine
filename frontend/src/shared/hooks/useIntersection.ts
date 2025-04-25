import { useCallback, useRef, useState } from 'react'

export const useIntersection = (
  currentPage: number,
  callback: (page: number) => void,
  hasMore: boolean = true,
  disabled: boolean = false
) => {
  const [isLoading, setIsLoading] = useState(false)

  // Prevent rapid successive calls by using a cooldown mechanism
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null)
  // Track if we've already triggered this page to avoid repeats
  const triggeredPagesRef = useRef<Set<number>>(new Set())

  // Отдельные наблюдатели для верхнего и нижнего элементов
  const topObserver = useRef<IntersectionObserver | null>(null)
  const bottomObserver = useRef<IntersectionObserver | null>(null)

  // Ref для отслеживания предыдущей страницы, используется для определения направления загрузки
  const prevPageRef = useRef<number>(currentPage)

  // Обновляем значение предыдущей страницы, когда текущая страница меняется
  if (prevPageRef.current !== currentPage) {
    // Очищаем триггеры при смене страницы
    if (Math.abs(prevPageRef.current - currentPage) > 1) {
      triggeredPagesRef.current.clear()
    }
    prevPageRef.current = currentPage
  }

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (bottomObserver.current) bottomObserver.current.disconnect()

      // Если отключено или уже загружается что-то, или нет больше данных - пропускаем
      if (!node || disabled || isLoading || !hasMore) return

      // Если для этой страницы уже был триггер, не делаем этого снова
      if (triggeredPagesRef.current.has(currentPage + 1)) return

      bottomObserver.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading && !disabled) {
            console.log(
              `Bottom observer triggering load for page ${currentPage + 1}`
            )

            // Установим флаг загрузки
            setIsLoading(true)

            // Отмечаем эту страницу как запрошенную
            triggeredPagesRef.current.add(currentPage + 1)

            // Очищаем предыдущий таймер, если есть
            if (cooldownTimerRef.current) {
              clearTimeout(cooldownTimerRef.current)
            }

            try {
              // Вызов коллбэка для загрузки следующей страницы
              await callback(currentPage + 1)
            } catch (error) {
              console.error('Error loading next page:', error)
            } finally {
              // Устанавливаем таймер охлаждения
              cooldownTimerRef.current = setTimeout(() => {
                setIsLoading(false)
              }, 1000)
            }
          }
        },
        { threshold: 0.1, rootMargin: '100px' }
      )

      bottomObserver.current.observe(node)
    },
    [currentPage, callback, hasMore, isLoading, disabled]
  )

  const firstElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (topObserver.current) topObserver.current.disconnect()

      // Если отключено или уже загружается что-то, или мы на первой странице - пропускаем
      if (!node || disabled || isLoading || currentPage <= 1) return

      // Если для этой страницы уже был триггер, не делаем этого снова
      if (triggeredPagesRef.current.has(currentPage - 1)) return

      topObserver.current = new IntersectionObserver(
        async (entries) => {
          if (
            entries[0].isIntersecting &&
            currentPage > 1 &&
            !isLoading &&
            !disabled
          ) {
            console.log(
              `Top observer triggering load for previous page ${currentPage - 1}`
            )

            // Установим флаг загрузки
            setIsLoading(true)

            // Отмечаем эту страницу как запрошенную
            triggeredPagesRef.current.add(currentPage - 1)

            // Очищаем предыдущий таймер, если есть
            if (cooldownTimerRef.current) {
              clearTimeout(cooldownTimerRef.current)
            }

            try {
              // Вызов коллбэка для загрузки предыдущей страницы
              await callback(currentPage - 1)
            } catch (error) {
              console.error('Error loading previous page:', error)
            } finally {
              // Устанавливаем таймер охлаждения
              cooldownTimerRef.current = setTimeout(() => {
                setIsLoading(false)
              }, 1000)
            }
          }
        },
        { threshold: 0.5, rootMargin: '20px' }
      )

      topObserver.current.observe(node)
    },
    [currentPage, callback, isLoading, disabled]
  )

  // Метод для сброса состояния триггеров при изменении чата
  const resetTriggers = useCallback(() => {
    triggeredPagesRef.current.clear()

    // Отключаем наблюдатели
    if (topObserver.current) topObserver.current.disconnect()
    if (bottomObserver.current) bottomObserver.current.disconnect()

    setIsLoading(false)
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current)
    }
  }, [])

  return {
    firstElementRef,
    lastElementRef,
    isLoading,
    resetTriggers,
  }
}
