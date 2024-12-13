import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, AlertTriangle, Info, X, Link, Binoculars } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FilterSection } from './filterSection';
import { ConfidenceLevel, FilterValues, VerificationType } from './type';
import { FILTER_OPTIONS } from './constant';
import { SAMPLE_ENTRIES } from './sampleData';

const App: React.FC = () => {
    const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filters, setFilters] = useState<FilterValues>({
        location: '',
        year: '',
        category: '',
        source: '',
        confidence: '',
        verification: '',
        manufacturer: '',
        countryOfOrigin: '',
        calibre: '',
        operationalStatus: '',
        dateRange: '',
    });
    const [activeFilters, setActiveFilters] = useState<Array<keyof FilterValues>>([]);

    const handleFilterChange = (key: keyof FilterValues, value: string): void => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        if (value && !activeFilters.includes(key)) {
            setActiveFilters((prev) => [...prev, key]);
        } else if (!value) {
            setActiveFilters((prev) => prev.filter((k) => k !== key));
        }
    };

    const clearFilter = (key: keyof FilterValues): void => {
        setFilters((prev) => ({ ...prev, [key]: '' }));
        setActiveFilters((prev) => prev.filter((k) => k !== key));
    };

    const clearAllFilters = (): void => {
        setFilters({
            location: '',
            year: '',
            category: '',
            source: '',
            confidence: '',
            verification: '',
            manufacturer: '',
            countryOfOrigin: '',
            calibre: '',
            operationalStatus: '',
            dateRange: '',
        });
        setActiveFilters([]);
    };

    const getVerificationStyles = (verified: VerificationType): string => {
        const styles = {
            Verified: 'bg-green-100 text-green-800',
            'Partially Verified': 'bg-yellow-100 text-yellow-800',
            Unverified: 'bg-gray-100 text-gray-800',
            Disputed: 'bg-red-100 text-red-800',
        };
        return styles[verified];
    };

    const getConfidenceStyles = (confidence: ConfidenceLevel): string => {
        const styles = {
            High: 'bg-green-100 text-green-800',
            Medium: 'bg-yellow-100 text-yellow-800',
            Low: 'bg-red-100 text-red-800',
        };
        return styles[confidence];
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Open Source Firearms Database</h1>
                <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-500">Last updated: 2 minutes ago</span>
                    <Clock className="w-4 h-4 text-gray-500" />
                </div>
            </div>

            {/* Main Search and Filter Toggle */}
            <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search weapons, locations, or sources..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    <Filter className="w-4 h-4" />
                    {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Advanced Filters */}
            {isFiltersVisible && (
                <div className="space-y-4">
                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {activeFilters.map((filter) => (
                                <span
                                    key={filter}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {filter}: {filters[filter]}
                                    <button
                                        onClick={() => clearFilter(filter)}
                                        className="hover:bg-blue-200 rounded-full p-1"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            <button onClick={clearAllFilters} className="text-sm text-gray-600 hover:text-gray-800">
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <FilterSection
                            label="Location"
                            options={FILTER_OPTIONS.locations}
                            value={filters.location}
                            onChange={(value) => handleFilterChange('location', value)}
                            count="8"
                        />
                        <FilterSection
                            label="Category"
                            options={FILTER_OPTIONS.categories}
                            value={filters.category}
                            onChange={(value) => handleFilterChange('category', value)}
                            count="7"
                        />
                        <FilterSection
                            label="Source"
                            options={FILTER_OPTIONS.sources}
                            value={filters.source}
                            onChange={(value) => handleFilterChange('source', value)}
                            count="7"
                        />
                        <FilterSection
                            label="Manufacturer"
                            options={FILTER_OPTIONS.manufacturers}
                            value={filters.manufacturer}
                            onChange={(value) => handleFilterChange('manufacturer', value)}
                            count="7"
                        />
                        <FilterSection
                            label="Calibre"
                            options={FILTER_OPTIONS.calibres}
                            value={filters.calibre}
                            onChange={(value) => handleFilterChange('calibre', value)}
                            count="8"
                        />
                        <FilterSection
                            label="Operational Status"
                            options={FILTER_OPTIONS.operationalStatus}
                            value={filters.operationalStatus}
                            onChange={(value) => handleFilterChange('operationalStatus', value)}
                            count="6"
                        />
                    </div>
                </div>
            )}

            {/* Safety Alert */}
            <Alert>
                <AlertDescription className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    All identifications require manual verification. AI suggestions are meant to assist, not replace,
                    human judgment.
                </AlertDescription>
            </Alert>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SAMPLE_ENTRIES.map((entry) => (
                    <Card key={entry.id} className="overflow-hidden">
                        <img src={entry.image} alt={entry.title} className="w-full h-48 object-cover" />
                        <CardContent className="p-4 space-y-4">
                            <div>
                                <h3 className="font-semibold">{entry.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                    <MapPin className="w-4 h-4" /> {entry.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" /> {entry.timestamp}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Info className="w-4 h-4" /> {entry.category} | {entry.calibre}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Binoculars className="w-4 h-4" /> {entry.source} | {entry.sourceDate}
                                </div>
                                {entry.sourceUrl && (
                                    <div className="flex items-center gap-2 text-sm text-blue-500 hover:underline">
                                        <Link className="w-4 h-4" /> Source
                                    </div>
                                )}
                            </div>

                            <p className="text-sm text-gray-600">{entry.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {entry.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${getConfidenceStyles(
                                        entry.confidence
                                    )}`}
                                >
                                    {entry.confidence} confidence
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${getVerificationStyles(
                                        entry.verified
                                    )}`}
                                >
                                    {entry.verified}
                                </span>
                            </div>

                            {entry.verifiedBy && (
                                <div className="text-xs text-gray-500">Verified by: {entry.verifiedBy.join(', ')}</div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default App;
