"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { InlineSearchResults } from "./inline-search-results"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")

  useEffect(() => {
    const savedQuery = localStorage.getItem("startuptn-search-query")
    const savedShowResults = localStorage.getItem("startuptn-show-results")

    if (savedQuery && savedShowResults === "true") {
      setSearchQuery(savedQuery)
      setCurrentQuery(savedQuery)
      setShowResults(true)
    }
  }, [])

  useEffect(() => {
    if (showResults && currentQuery) {
      localStorage.setItem("startuptn-search-query", currentQuery)
      localStorage.setItem("startuptn-show-results", "true")
    } else {
      localStorage.removeItem("startuptn-search-query")
      localStorage.removeItem("startuptn-show-results")
    }
  }, [showResults, currentQuery])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentQuery(searchQuery.trim())
      setShowResults(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentQuery(query)
    setShowResults(true)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setCurrentQuery("")
    setSearchQuery("")
    localStorage.removeItem("startuptn-search-query")
    localStorage.removeItem("startuptn-show-results")
  }

  return (
    <section className="relative bg-white min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 pt-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${showResults ? "mt-8" : ""}`}>
            StartupTN
          </h1>
          <p className="text-lg text-gray-600 mb-8">Find funding, mentors, and resources for your startup journey</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-6 bg-white border border-gray-200 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for funding, programs, mentors, or resources..."
                  className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Try:</span>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                onClick={() => handlePopularSearch("Seed Funding")}
              >
                Seed Funding
              </button>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                onClick={() => handlePopularSearch("Incubation")}
              >
                Incubation
              </button>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                onClick={() => handlePopularSearch("Mentorship")}
              >
                Mentorship
              </button>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                onClick={() => handlePopularSearch("Tech Support")}
              >
                Tech Support
              </button>
            </div>
          </Card>
        </div>

        <div className="relative">
          {showResults && <InlineSearchResults query={currentQuery} onClose={handleCloseResults} />}
        </div>
      </div>
    </section>
  )
}
