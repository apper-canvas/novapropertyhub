import { toast } from 'react-toastify'
import mockProperties from '@/services/mockData/properties.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock service layer for properties - ready for ApperClient integration
export const propertyService = {
  async getAll() {
    await delay(Math.random() * 300 + 200)
    try {
      // TODO: Replace with ApperClient when database tables are available
      // const { ApperClient } = window.ApperSDK
      // const apperClient = new ApperClient({
      //   apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      //   apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      // })
      // const params = {
      //   fields: [
      //     { field: { Name: "Id" } },
      //     { field: { Name: "title" } },
      //     { field: { Name: "price" } },
      //     { field: { Name: "location" } },
      //     { field: { Name: "bedrooms" } },
      //     { field: { Name: "bathrooms" } },
      //     { field: { Name: "squareFeet" } },
      //     { field: { Name: "propertyType" } },
      //     { field: { Name: "images" } },
      //     { field: { Name: "description" } },
      //     { field: { Name: "features" } },
      //     { field: { Name: "listingDate" } },
      //     { field: { Name: "yearBuilt" } },
      //     { field: { Name: "lotSize" } },
      //     { field: { Name: "parking" } }
      //   ]
      // }
      // const response = await apperClient.fetchRecords('Properties', params)
      // return response.success ? response.data : []
      
      return [...mockProperties]
    } catch (error) {
      console.error('Error fetching properties:', error?.response?.data?.message || error.message)
      toast.error('Failed to load properties')
      return []
    }
  },

  async getById(id) {
    await delay(Math.random() * 200 + 200)
    try {
      // TODO: Replace with ApperClient when database tables are available
      // const { ApperClient } = window.ApperSDK
      // const apperClient = new ApperClient({
      //   apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      //   apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      // })
      // const params = {
      //   fields: [
      //     { field: { Name: "Id" } },
      //     { field: { Name: "title" } },
      //     { field: { Name: "price" } },
      //     { field: { Name: "location" } },
      //     { field: { Name: "bedrooms" } },
      //     { field: { Name: "bathrooms" } },
      //     { field: { Name: "squareFeet" } },
      //     { field: { Name: "propertyType" } },
      //     { field: { Name: "images" } },
      //     { field: { Name: "description" } },
      //     { field: { Name: "features" } },
      //     { field: { Name: "listingDate" } },
      //     { field: { Name: "yearBuilt" } },
      //     { field: { Name: "lotSize" } },
      //     { field: { Name: "parking" } }
      //   ]
      // }
      // const response = await apperClient.getRecordById('Properties', id, params)
      // return response.success ? response.data : null
      
      const property = mockProperties.find(p => p.Id === Number(id))
      return property ? { ...property } : null
    } catch (error) {
      console.error(`Error fetching property with ID ${id}:`, error?.response?.data?.message || error.message)
      toast.error('Failed to load property details')
      return null
    }
  },

  async create(propertyData) {
    await delay(300)
    try {
      // TODO: Replace with ApperClient when database tables are available
      // const { ApperClient } = window.ApperSDK
      // const apperClient = new ApperClient({
      //   apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      //   apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      // })
      // const params = {
      //   records: [{
      //     title: propertyData.title,
      //     price: propertyData.price,
      //     location: JSON.stringify(propertyData.location),
      //     bedrooms: propertyData.bedrooms,
      //     bathrooms: propertyData.bathrooms,
      //     squareFeet: propertyData.squareFeet,
      //     propertyType: propertyData.propertyType,
      //     images: JSON.stringify(propertyData.images),
      //     description: propertyData.description,
      //     features: JSON.stringify(propertyData.features),
      //     yearBuilt: propertyData.yearBuilt,
      //     lotSize: propertyData.lotSize,
      //     parking: propertyData.parking
      //   }]
      // }
      // const response = await apperClient.createRecord('Properties', params)
      // if (!response.success) {
      //   console.error(response.message)
      //   toast.error(response.message)
      //   return null
      // }
      // const successfulRecords = response.results.filter(result => result.success)
      // return successfulRecords.length > 0 ? successfulRecords[0].data : null
      
      const newId = Math.max(...mockProperties.map(p => p.Id)) + 1
      const newProperty = {
        ...propertyData,
        Id: newId,
        listingDate: new Date().toISOString()
      }
      mockProperties.push(newProperty)
      toast.success('Property created successfully')
      return { ...newProperty }
    } catch (error) {
      console.error('Error creating property:', error?.response?.data?.message || error.message)
      toast.error('Failed to create property')
      return null
    }
  },

  async update(id, updates) {
    await delay(250)
    try {
      // TODO: Replace with ApperClient when database tables are available
      // const { ApperClient } = window.ApperSDK
      // const apperClient = new ApperClient({
      //   apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      //   apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      // })
      // const params = {
      //   records: [{
      //     Id: id,
      //     ...updates
      //   }]
      // }
      // const response = await apperClient.updateRecord('Properties', params)
      // if (!response.success) {
      //   console.error(response.message)
      //   toast.error(response.message)
      //   return null
      // }
      // const successfulUpdates = response.results.filter(result => result.success)
      // return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      
      const index = mockProperties.findIndex(p => p.Id === Number(id))
      if (index === -1) {
        toast.error('Property not found')
        return null
      }
      mockProperties[index] = { ...mockProperties[index], ...updates }
      toast.success('Property updated successfully')
      return { ...mockProperties[index] }
    } catch (error) {
      console.error('Error updating property:', error?.response?.data?.message || error.message)
      toast.error('Failed to update property')
      return null
    }
  },

  async delete(id) {
    await delay(200)
    try {
      // TODO: Replace with ApperClient when database tables are available
      // const { ApperClient } = window.ApperSDK
      // const apperClient = new ApperClient({
      //   apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      //   apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      // })
      // const params = {
      //   RecordIds: [id]
      // }
      // const response = await apperClient.deleteRecord('Properties', params)
      // if (!response.success) {
      //   console.error(response.message)
      //   toast.error(response.message)
      //   return false
      // }
      // return response.results.filter(result => result.success).length > 0
      
      const index = mockProperties.findIndex(p => p.Id === Number(id))
      if (index === -1) {
        toast.error('Property not found')
        return false
      }
      const deletedProperty = mockProperties.splice(index, 1)[0]
      toast.success('Property deleted successfully')
      return { ...deletedProperty }
    } catch (error) {
      console.error('Error deleting property:', error?.response?.data?.message || error.message)
      toast.error('Failed to delete property')
      return false
    }
  },

  async searchByLocation(location) {
    await delay(Math.random() * 400 + 200)
    try {
      const searchTerm = location.toLowerCase()
      const results = mockProperties.filter(property =>
        property.location.city.toLowerCase().includes(searchTerm) ||
        property.location.state.toLowerCase().includes(searchTerm) ||
        property.location.neighborhood?.toLowerCase().includes(searchTerm)
      )
      return results.map(p => ({ ...p }))
    } catch (error) {
      console.error('Error searching by location:', error?.response?.data?.message || error.message)
      toast.error('Failed to search properties')
      return []
    }
  },

  async filterByPriceRange(minPrice, maxPrice) {
    await delay(Math.random() * 300 + 200)
    try {
      const results = mockProperties.filter(property => {
        const price = property.price
        const meetsMin = minPrice ? price >= minPrice : true
        const meetsMax = maxPrice ? price <= maxPrice : true
        return meetsMin && meetsMax
      })
      return results.map(p => ({ ...p }))
    } catch (error) {
      console.error('Error filtering by price range:', error?.response?.data?.message || error.message)
      toast.error('Failed to filter properties')
      return []
    }
  },

  async filterByPropertyType(propertyType) {
    await delay(Math.random() * 200 + 200)
    try {
      const results = mockProperties.filter(property =>
        property.propertyType.toLowerCase() === propertyType.toLowerCase()
      )
      return results.map(p => ({ ...p }))
    } catch (error) {
      console.error('Error filtering by property type:', error?.response?.data?.message || error.message)
      toast.error('Failed to filter properties')
      return []
    }
  },

  async searchProperties(searchQuery, filters = {}) {
    await delay(Math.random() * 400 + 200)
    try {
      let results = [...mockProperties]

      // Text search
      if (searchQuery && searchQuery.trim()) {
        const searchTerm = searchQuery.toLowerCase()
        results = results.filter(property =>
          property.title.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm) ||
          property.location.city.toLowerCase().includes(searchTerm) ||
          property.location.state.toLowerCase().includes(searchTerm) ||
          property.location.neighborhood?.toLowerCase().includes(searchTerm) ||
          property.propertyType.toLowerCase().includes(searchTerm) ||
          property.features?.some(feature => feature.toLowerCase().includes(searchTerm))
        )
      }

      // Apply filters
      if (filters.priceMin) {
        results = results.filter(p => p.price >= filters.priceMin)
      }
      if (filters.priceMax) {
        results = results.filter(p => p.price <= filters.priceMax)
      }
      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        results = results.filter(p => filters.propertyTypes.includes(p.propertyType))
      }
      if (filters.bedrooms) {
        if (filters.bedrooms === "5+") {
          results = results.filter(p => p.bedrooms >= 5)
        } else {
          results = results.filter(p => p.bedrooms === filters.bedrooms)
        }
      }
      if (filters.bathrooms) {
        if (filters.bathrooms === "5+") {
          results = results.filter(p => p.bathrooms >= 5)
        } else {
          results = results.filter(p => p.bathrooms === filters.bathrooms)
        }
      }

      return results.map(p => ({ ...p }))
    } catch (error) {
      console.error('Error searching properties:', error?.response?.data?.message || error.message)
      toast.error('Failed to search properties')
      return []
    }
  }
}