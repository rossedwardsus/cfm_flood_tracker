import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default (props: any) => props.data.map((row: any) => (
			                          <TableRow key={1}>
			                            <TableCell component="th" scope="row">
			                              {row.event}
			                            </TableCell>
			                            <TableCell align="right">{row.data}</TableCell>
			                            <TableCell align="right">{row.coreid}</TableCell>
			                            <TableCell align="right">}</TableCell>
			                          </TableRow>
			                        ))
			                      