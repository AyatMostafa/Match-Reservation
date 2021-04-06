
DROP DATABASE IF EXISTS EFA_DB;
Create DataBase IF NOT EXISTS EFA_DB;
use EFA_DB;


Create Table Teams(
    TeamName varchar(50) not NULL,
    Primary Key(TeamName)
);

Create Table Cities(
    CityName varchar(50) not NULL,
    Primary Key(CityName)
);

Create Table Referees(
    RefName varchar(50) not NULL,
    Primary Key (RefName)
);

Create Table LineMen(
    LineManName varchar(50) not NULL,
    Primary Key(LineManName)
);


Create Table users(
    UserName varchar(50) not NULL,
    Pass varchar(50) not NULL,
    FName varchar(50) not NULL,
    LName varchar(50) not NULL,
    BirthDate Date,
    Gender Char(1),  
    City varchar(20) not NULL,
    UserAddress varchar(50),
    Email varchar(50) not NULL,
    UserRole char(1), 
    Approved char(1), 
    Primary Key(UserName)
);

Create Table matches(
    HomeTeam varchar(50) not NULL,
    AwayTeam varchar(50) not NULL,
    Venue varchar (20) not NULL,
    MatchDate Date not NULL,
    MatchHour int not NULL,
    MatchMin int not NULL,
    MainReferee varchar(50) not NULL,
    LineMan1 varchar(50) not NULL,
    LineMan2 varchar(50) not NULL,
    Primary Key(Venue, MatchDate, MatchHour, MatchMin)
);

Create Table Stadiums(
    StadiumName varchar(50) not NULL,
    Place varchar(50) not NULL,
    NumberOfRows int,
    NumberOfColumns int,
    Primary Key(StadiumName)
);

Create Table ReservedSeats(
    StadiumName varchar(50) not NULL,
    TicketNumber int not NULL,
    ReservingUser varchar(50) not NULL,
    ReservationDate Date,
    Primary Key(StadiumName, TicketNumber),
    Foreign Key(StadiumName) References Stadiums(StadiumName) On Delete Cascade,
    Foreign Key(ReservingUser) References users(UserName) On Delete Cascade
);



Insert Into Teams(TeamName) Values ('Al Ahly');
Insert Into Teams(TeamName) Values ('Zamalek');
Insert Into Teams(TeamName) Values ('El Gouna');
Insert Into Teams(TeamName) Values ('Pyramids');
Insert Into Teams(TeamName) Values ('Al Masry');
Insert Into Teams(TeamName) Values ('ENPPI');
Insert Into Teams(TeamName) Values ('Misr Lel Makkasa');
Insert Into Teams(TeamName) Values ('Smouha');
Insert Into Teams(TeamName) Values ('Ceramica Cleopatra');
Insert Into Teams(TeamName) Values ('National Bank');
Insert Into Teams(TeamName) Values ('Ghazl El Mahala');
Insert Into Teams(TeamName) Values ('Al Ittihad');
Insert Into Teams(TeamName) Values ('Aswan');
Insert Into Teams(TeamName) Values ('Ismaily');
Insert Into Teams(TeamName) Values ('El Gaish');
Insert Into Teams(TeamName) Values ('Al Mokawloon');
Insert Into Teams(TeamName) Values ('Wadi Degla');
Insert Into Teams(TeamName) Values ('E Entag El Harby');

Insert Into Cities(CityName) Values('Cairo');
Insert Into Cities(CityName) Values('Alexandria');
Insert Into Cities(CityName) Values('Giza');
Insert Into Cities(CityName) Values('Shubra El Kheima');
Insert Into Cities(CityName) Values('Port Said');
Insert Into Cities(CityName) Values('Suez');
Insert Into Cities(CityName) Values('El Mahalla El Kubra');
Insert Into Cities(CityName) Values('Luxor');
Insert Into Cities(CityName) Values('Mansoura');
Insert Into Cities(CityName) Values('Tanta');
Insert Into Cities(CityName) Values('Asyut');
Insert Into Cities(CityName) Values('Ismailia');
Insert Into Cities(CityName) Values('Faiyum');
Insert Into Cities(CityName) Values('Zagazig');
Insert Into Cities(CityName) Values('Damietta');
Insert Into Cities(CityName) Values('Aswan');
Insert Into Cities(CityName) Values('Minya');
Insert Into Cities(CityName) Values('Damanhur');
Insert Into Cities(CityName) Values('Beni Suef');
Insert Into Cities(CityName) Values('Hurghada');
Insert Into Cities(CityName) Values('Qena');
Insert Into Cities(CityName) Values('Sohag');
Insert Into Cities(CityName) Values('Banha');


Insert Into Referees(RefName) Values('Referee 1');
Insert Into Referees(RefName) Values('Referee 2');
Insert Into Referees(RefName) Values('Referee 3');
Insert Into Referees(RefName) Values('Referee 4');
Insert Into Referees(RefName) Values('Referee 5');
Insert Into Referees(RefName) Values('Referee 6');
Insert Into Referees(RefName) Values('Referee 7');
Insert Into Referees(RefName) Values('Referee 8');
Insert Into Referees(RefName) Values('Referee 9');
Insert Into Referees(RefName) Values('Referee 10');

Insert Into LineMen(LineManName) Values('LineMan 1');
Insert Into LineMen(LineManName) Values('LineMan 2');
Insert Into LineMen(LineManName) Values('LineMan 3');
Insert Into LineMen(LineManName) Values('LineMan 4');
Insert Into LineMen(LineManName) Values('LineMan 5');
Insert Into LineMen(LineManName) Values('LineMan 6');
Insert Into LineMen(LineManName) Values('LineMan 7');
Insert Into LineMen(LineManName) Values('LineMan 8');
Insert Into LineMen(LineManName) Values('LineMan 9');
Insert Into LineMen(LineManName) Values('LineMan 10');