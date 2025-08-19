import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddCityForm } from '../components/AddCityForm';

describe('AddCityForm Integration', () => {
  it('should allow user to add a new city', async () => {
    const user = userEvent.setup();
    const mockAddCity = vi.fn();

    render(<AddCityForm onAddCity={mockAddCity} />);

    // Click the Add City button
    const addButton = screen.getByText('+ Add City');
    await user.click(addButton);

    // Select a city from dropdown
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Paris, France');

    // Click Add button
    const submitButton = screen.getByText('Add');
    await user.click(submitButton);

    // Verify the callback was called with correct data
    expect(mockAddCity).toHaveBeenCalledWith(
      expect.objectContaining({
        city: 'Paris',
        country: 'France',
        temperature: expect.any(Number),
        humidity: expect.any(Number),
        windSpeed: expect.any(Number),
        condition: expect.any(String),
        icon: expect.any(String),
        lastUpdated: expect.any(String),
      })
    );
  });

  it('should cancel adding a city', async () => {
    const user = userEvent.setup();
    const mockAddCity = vi.fn();

    render(<AddCityForm onAddCity={mockAddCity} />);

    // Click the Add City button
    const addButton = screen.getByText('+ Add City');
    await user.click(addButton);

    // Click Cancel button
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    // Should return to initial state
    expect(screen.getByText('+ Add City')).toBeInTheDocument();
    expect(mockAddCity).not.toHaveBeenCalled();
  });

  it('should require city selection before allowing add', async () => {
    const user = userEvent.setup();
    const mockAddCity = vi.fn();

    render(<AddCityForm onAddCity={mockAddCity} />);

    // Click the Add City button
    const addButton = screen.getByText('+ Add City');
    await user.click(addButton);

    // Try to click Add without selecting a city
    const submitButton = screen.getByText('Add');
    expect(submitButton).toBeDisabled();

    expect(mockAddCity).not.toHaveBeenCalled();
  });

  it('should show all predefined cities in dropdown', async () => {
    const user = userEvent.setup();
    const mockAddCity = vi.fn();

    render(<AddCityForm onAddCity={mockAddCity} />);

    // Click the Add City button
    const addButton = screen.getByText('+ Add City');
    await user.click(addButton);

    // Check if predefined cities are available
    expect(screen.getByText('Paris, France')).toBeInTheDocument();
    expect(screen.getByText('Berlin, Germany')).toBeInTheDocument();
    expect(screen.getByText('Rome, Italy')).toBeInTheDocument();
    expect(screen.getByText('Madrid, Spain')).toBeInTheDocument();
  });
});
