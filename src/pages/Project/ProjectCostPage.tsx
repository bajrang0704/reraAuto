import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useForm } from 'react-hook-form';

interface ProjectCostFormValues {
    projectName: string;
    costs: { [key: string]: { estimated: string, actual: string } };
}

const ProjectCostPage = () => {
    const { register, handleSubmit } = useForm<ProjectCostFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            costs: {}
        }
    });

    const onSubmit = (data: ProjectCostFormValues) => {
        console.log("Project Cost Data:", data);
        alert("Project Cost Details Saved Successfully!");
    };

    // Define the complex table structure
    const tableStructure = [
        { id: '1', srNo: '1', particular: 'Land Cost :', isHeading: true },
        { id: '1a', srNo: 'a', particular: 'Acquisition Cost of Land or Development Rights, lease Premium, lease rent, interest cost incurred or payable on Land Cost and legal cost *' },
        { id: '1b', srNo: 'b', particular: 'Amount of Premium payable to obtain development rights, FSI, additional FSI, fungible area, and any other incentive under DCR from Local Authority or State Government/UT Administration or any Statutory Authority *' },
        { id: '1c', srNo: 'c', particular: 'Acquisition cost of TDR (if any) *' },
        { id: '1d', srNo: 'd', particular: 'Amounts payable to State Government/UT Administration or competent authority or any other statutory authority of the State or Central Government, towards stamp duty, transfer charges, registration fees etc; and *' },
        { id: '1e', srNo: 'e', particular: 'Land Premium payable as per annual statement of rates (ASR) for redevelopment of land owned by public authorities *' },
        { id: '1f', srNo: 'f', particular: '', isSubHeading: true }, // Parent for i, ii, iii
        { id: '1fi', srNo: 'i', particular: 'Estimated construction cost of rehab building including site developmentand infrastructure for the same ascertified by Engineer \nActual Cost of construction of rehab building incurred as per the books of accounts as verified by the CA *' },
        { id: '1fii', srNo: 'ii', particular: 'Cost towards clearance of land of all or any encumbrances including cost of removal of legal/illegal occupants, cost for providing temporary transit accommodation or rent in lieu of Transit Accommodation, overhead cost *' },
        { id: '1fiii', srNo: 'iii', particular: 'Cost of ASR linked premium, fees, charges and security deposits or maintenance deposit, or any amount whatsoever payable to any authorities towards and in project of rehabilitation *' },

        { id: '2', srNo: '2', particular: 'Development Cost/ Cost of Construction', isHeading: true },
        { id: '2a', srNo: 'a', particular: '', isSubHeading: true },
        { id: '2aiii', srNo: 'i', particular: 'Estimated Cost of Construction as certified by Engineer \n\nActual Cost of construction incurred as per the books of accounts as verified by the CA. \nminimum of (i) and (ii) has to be considered. *' },
        { id: '2aiii_custom', srNo: 'ii', particular: '(This row seems merged in the reference, but logically separate. Handling as purely description in 2.a.i based on text, but adding placeholders if needed. User request shows 2.a.i ... 2.a.iii)' },
        // Correction based on user text: 
        // 2.a.i & 2.a.ii are actually headings/descriptions for the calculation but the input is single? 
        // The user text says: "i Estimated... ii Actual... minimum of (i) and (ii) has to be considered."
        // And then row 2.a.iii "On-site expenditure..."
        // Let's stick to the visible rows with input boxes in the screenshot.

        { id: '2ai_ii_merged', srNo: 'i', particular: 'Estimated Cost of Construction as certified by Engineer \n\nActual Cost of construction incurred as per the books of accounts as verified by the CA. \nminimum of (i) and (ii) has to be considered. *' },
        { id: '2aiii', srNo: 'iii', particular: 'On-site expenditure for development of entire project excluding cost of construction as per (a) above, i.e. salaries, consultants fees, site overheads, development works, cost of services (including water, electricity, sewerage), cost of machineries and equipment including its hire and maintenance costs, consumables, Advertisement charges etc. All costs directly incurred to complete the construction of the entire phase of the project registered. *' },
        { id: '2b', srNo: 'b', particular: 'Payment of Taxes, cess, fees, charges, premiums, interest etc to any statutory Authority *' },
        { id: '2c', srNo: 'c', particular: 'Interest payable to financial institutions, scheduled banks, non-banking financial institution (NBFC) or money lenders on construction funding or money borrowed for construction *' },

        { id: '3', srNo: '3', particular: 'Total Estimated Cost of the Real Estate Project *', isTotal: true },
    ];

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', pb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Add Project Cost
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'error', fontWeight: 'bold' }}>
                    All * Mark Field are Mandatory.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Project Name *"
                            {...register('projectName', { required: true })}
                            defaultValue="SAMPLE"
                        >
                            <MenuItem value="SAMPLE">SAMPLE</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                <TableContainer sx={{ border: '1px solid #e0e0e0' }}>
                    <Table size="small" sx={{ '& .MuiTableCell-root': { borderRight: '1px solid #e0e0e0' } }}>
                        <TableHead sx={{ bgcolor: '#44a1d4' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '50px' }}>Sr. No</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '50px' }}></TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '50px' }}></TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Particular</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }}>Estimated Total Amount (in INR)</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }}>Actual Total Amount (in INR)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableStructure.map((row) => {
                                // Logic to determine indentation/column layout based on SrNo structure
                                // Simple mapping for visual fidelity
                                let col1 = '', col2 = '', col3 = '';
                                if (row.isHeading || row.isTotal) {
                                    col1 = row.srNo;
                                } else if (['a', 'b', 'c', 'd', 'e', 'f'].includes(row.srNo)) {
                                    col2 = row.srNo;
                                } else {
                                    col3 = row.srNo;
                                }

                                if (row.id === '2aiii_custom') return null; // Skip placeholder

                                const isInputRow = !row.isHeading && !row.isSubHeading && !row.isTotal;
                                const isTotalRow = row.isTotal;

                                return (
                                    <TableRow key={row.id} sx={{ bgcolor: row.isHeading ? '#e0f2f1' : 'inherit' }}>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>{col1}</TableCell>
                                        <TableCell align="center">{col2}</TableCell>
                                        <TableCell align="center">{col3}</TableCell>
                                        <TableCell sx={{ whiteSpace: 'pre-line' }}>{row.particular}</TableCell>

                                        {/* Input Columns */}
                                        <TableCell>
                                            {(isInputRow || isTotalRow) && (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder="000000.00"
                                                    sx={{ bgcolor: 'white' }}
                                                    {...register(`costs.${row.id}.estimated` as const)}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {(isInputRow || isTotalRow) && (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder="000000.00"
                                                    sx={{ bgcolor: 'white' }}
                                                    {...register(`costs.${row.id}.actual` as const)}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button type="submit" variant="contained" size="large">
                        Save
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProjectCostPage;
