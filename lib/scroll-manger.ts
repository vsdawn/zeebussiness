interface ScrollPosition {
  scrollY: number
  cardOffsetFromTop: number
  cardId: string
  timestamp: number
}

export class ScrollPositionManager {
  private static readonly STORAGE_KEY = "shareScrollPosition"
  private static readonly POSITION_TIMEOUT = 10000 // 10 seconds

  static savePosition(cardElement: Element): void {
    try {
      const cardRect = cardElement.getBoundingClientRect()
      const scrollY = window.scrollY
      const cardOffsetFromTop = cardRect.top + scrollY
      const cardId = cardElement.getAttribute("data-article-id") || cardElement.id || ""

      const position: ScrollPosition = {
        scrollY,
        cardOffsetFromTop,
        cardId,
        timestamp: Date.now(),
      }

      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(position))
    } catch (error) {
      console.error("Error saving scroll position:", error)
    }
  }

  static restorePosition(): void {
    try {
      const savedPosition = sessionStorage.getItem(this.STORAGE_KEY)
      if (!savedPosition) return

      const position: ScrollPosition = JSON.parse(savedPosition)

      // Check if position is still valid (not too old)
      if (Date.now() - position.timestamp > this.POSITION_TIMEOUT) {
        this.clearPosition()
        return
      }

      // Try to find the card by ID first
      if (position.cardId) {
        const cardElement =
          document.querySelector(`[data-article-id="${position.cardId}"]`) || document.getElementById(position.cardId)

        if (cardElement) {
          const currentCardRect = cardElement.getBoundingClientRect()
          const currentCardOffsetFromTop = currentCardRect.top + window.scrollY

          // Calculate position difference and adjust scroll
          const positionDiff = currentCardOffsetFromTop - position.cardOffsetFromTop
          const targetScrollY = position.scrollY + positionDiff

          window.scrollTo({
            top: Math.max(0, targetScrollY), // Ensure we don't scroll to negative position
            behavior: "smooth",
          })

          this.clearPosition()
          return
        }
      }

      // Fallback to original scroll position
      window.scrollTo({
        top: Math.max(0, position.scrollY),
        behavior: "smooth",
      })

      this.clearPosition()
    } catch (error) {
      console.error("Error restoring scroll position:", error)
      this.clearPosition()
    }
  }

  static clearPosition(): void {
    try {
      sessionStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Error clearing scroll position:", error)
    }
  }

  static hasStoredPosition(): boolean {
    try {
      const savedPosition = sessionStorage.getItem(this.STORAGE_KEY)
      if (!savedPosition) return false

      const position: ScrollPosition = JSON.parse(savedPosition)
      return Date.now() - position.timestamp <= this.POSITION_TIMEOUT
    } catch (error) {
      return false
    }
  }
}
