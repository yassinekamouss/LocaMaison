import React, { useState } from 'react';
import SideBar from './SideBar';
import { Calendar, FileText, Download, Filter } from 'lucide-react';

export default function Rapport () {
    const [reportConfig, setReportConfig] = useState({
        startDate: '',
        endDate: '',
        reportType: 'properties',
        format: 'pdf'
    });

    const handleConfigChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setReportConfig(prev => {
        if (type === 'checkbox') {
            return {
            ...prev,
            sections: {
                ...prev.sections,
                [name]: checked
            }
            };
        }
        return {
            ...prev,
            [name]: value
        };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Generating report with config:', reportConfig);
    };

    return (
        <div>
            <SideBar />

            {/* Contenu principale */}
            <div className="ms-64 mx-auto p-6 px-8">
                <div className='bg-white w-full mb-5 p-6 shadow-lg rounded-xl'>Génération de Rapports</div>
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-200 p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <FileText className="text-blue-600" />
                            Générateur de Rapports
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Personnalisez et générez des rapports détaillés sur vos biens immobiliers
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Période du rapport */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date de début
                                </label>
                                <div className="relative">
                                    <input
                                    type="date"
                                    name="startDate"
                                    value={reportConfig.startDate}
                                    onChange={handleConfigChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date de fin
                                </label>
                                <div className="relative">
                                    <input
                                    type="date"
                                    name="endDate"
                                    value={reportConfig.endDate}
                                    onChange={handleConfigChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Type de rapport */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de rapport
                            </label>
                            <select
                                name="reportType"
                                value={reportConfig.reportType}
                                onChange={handleConfigChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="properties">Biens immobiliers</option>
                                <option value="financial">Rapport financier</option>
                                <option value="analytics">Analyses et statistiques</option>
                                <option value="complete">Rapport complet</option>
                            </select>
                        </div>

                        {/* Format du rapport */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Format d'export
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name="format"
                                    value="pdf"
                                    checked={reportConfig.format === 'pdf'}
                                    onChange={handleConfigChange}
                                    className="mr-2"
                                    />
                                    PDF
                                </label>
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name="format"
                                    value="excel"
                                    checked={reportConfig.format === 'excel'}
                                    onChange={handleConfigChange}
                                    className="mr-2"
                                    />
                                    Excel
                                </label>
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name="format"
                                    value="csv"
                                    checked={reportConfig.format === 'csv'}
                                    onChange={handleConfigChange}
                                    className="mr-2"
                                    />
                                    CSV
                                </label>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <button
                            type="button"
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                            Aperçu
                            </button>
                            <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                            <Download size={20} />
                            Générer le rapport
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};